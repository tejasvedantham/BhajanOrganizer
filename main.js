/*

Sathya Sai Bhajans Organizer
Author: Tejas Vedantham
Version: 1.2.1
Created: Jan. 2020

*/

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const DataStore = require('nedb');
var nodeConsole = require('console');
var fs = require('fs');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    //Load index.html
    win.loadFile('./html_pages/navbar.html');
}

function closeWindow() {
    currPresDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
}

//Load db's from memory
var bhajansDB = new DataStore({ filename: 'bhajans-master.db', autoload: true });
var singersDB = new DataStore({ filename: 'singers-master.db', autoload: true });
var currPresDB = new DataStore({ filename: 'current-presentation.db', autoload: true});

ipcMain.on('bhajan-to-search', function (event, data) {
    myConsole.log("Search Query: " + data)
    var regex = new RegExp(data, "i");

    bhajansDB.find({ $or: [{ title: regex }, { lyrics: regex }] }, function (err, docs) {
        event.returnValue = docs;
    });

});

ipcMain.on('get-bhajans-dropdown', function (event, data) {
    bhajansDB.find({}, function (err, docs) {
        event.returnValue = docs;
    })
});

ipcMain.on('get-singers-dropdown', function (event, data) {
    singersDB.find({}, { gender: 0, _id: 0 }, function (err, docs) {
        event.returnValue = docs;
    })
});

ipcMain.on('get-all-singers', function (event, data) {
    singersDB.find({}, function (err, docs) {
        event.returnValue = docs;
    })
});

ipcMain.on('add-new-singer', function (event, data) {
    singersDB.insert(data, function (err, newDocs) {
        event.returnValue = 200;
    });
});

ipcMain.on('update-bhajan', function (event, data) {
    bhajansDB.update({ _id: data[0] }, { $set: { title: data[1], lyrics: data[2], meaning: data[3] } }, {}, function (err, numRemoved) {
        event.returnValue = 200;
    });

});

ipcMain.on('add-new-bhajan', function (event, data) {
    bhajansDB.insert(data, function (err, newDocs) {
        event.returnValue = 200;
    });
});

ipcMain.on('add-bhajan-to-pres', function (event, data) {
    currPresDB.insert(data, function (err, newDocs) {
        event.returnValue = 200;
    });
})

ipcMain.on('open-presentation', function(event, data) {
    dialog.showOpenDialog({
        properties: ['openFile']
    }).then(result => {
        myConsole.log(result.canceled);
        myConsole.log(result.filePaths);
        event.returnValue = "Success";
    }).catch(err => {
        myConsole.log(err);
        event.returnValue = "Failed!";
    })
})

app.on('ready', createWindow)
app.on('quit', closeWindow);
