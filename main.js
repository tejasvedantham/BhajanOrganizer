/*

Sathya Sai Bhajans Organizer
Author: Tejas Vedantham
Version: 1.2.1
Created: Jan. 2020

*/

const {app, BrowserWindow, ipcMain} = require('electron');
const DataStore = require('nedb');
var nodeConsole = require('console');
var fs = require('fs');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    //Load index.html
    win.loadFile('./html_pages/search.html')
}

//Load db's from memory
var bhajansDB = new DataStore({ filename: 'bhajans-master.db', autoload: true});
var singersDB = new DataStore({ filename: 'singers-master.db', autoload: true});


ipcMain.on('bhajan-to-search', function(event, data) {
    myConsole.log("Search Query: " + data)
    var regex = new RegExp(data, "i");

    bhajansDB.find({ $or: [ {title: regex}, {lyrics: regex}] }, function(err, docs) {
        myConsole.log(docs);
        event.sender.send('bhajans-list-found', docs);
    });
    
});

app.on('ready', createWindow)
