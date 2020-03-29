/*

Sathya Sai Bhajans Organizer
Author: Tejas Vedantham
Version: 1.1.1
Created: Jan. 2020

*/

const {app, BrowserWindow, Menu, MenuItem, ipcMain} = require('electron');
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

var bhajansDB = new DataStore({ filename: 'bhajans-master.db', autoload: true});

app.on('ready', createWindow)
