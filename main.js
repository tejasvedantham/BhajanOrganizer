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
const pptxgen = require('pptxgenjs');
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
    // currPresDB.remove({}, { multi: true }, function (err, numRemoved) {
    // });
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
        title: "Open Presentation",
        buttonLabel: "Open Presentation",
        properties: ['openFile']
    }).then(result => {
        myConsole.log(result.canceled);
        myConsole.log(result.filePaths);
        event.returnValue = "Success";
    }).catch(err => {
        myConsole.log(err);
        event.returnValue = "Failed!";
    });
})

ipcMain.on('save-presentation', function(event, data) {
    dialog.showSaveDialog({
        title: "Save Presentation",
        buttonLabel: "Save Presentation",
        properties: ['createDirectory']
    }).then(result => {
        myConsole.log(result.filePath);
        event.returnValue = "Saved!";
    });
});

ipcMain.on('get-table-info', function(event, data) {
    var rows = [[
        { text: "Bhajan", options: {colspan: 5, bold: true } },
        { text: "Singer", options: {colspan: 3, bold: true } },
        { text: "Scale", options: {colspan: 2, bold: true } }
    ]];
    currPresDB.find({}, function(err, docs) {
        docs.forEach((element, index, array) => {
            rows.push([
                { text: element.bhajanfield, options: {colspan: 5} },
                { text: element.singersfield, options: {colspan: 3} },
                { text: element.scalefield + " " + element.scaletypefield, options: {colspan: 2} }
            ]);
        });
        event.returnValue = rows;
    });
});

ipcMain.on('get-bhajan-for-pres', function(event, data) {
    bhajansDB.find({ _id: data}, function(err, docs) {
        event.returnValue = docs;
    });
});

ipcMain.on('generate-ppt', function(event, data) {
    var presentation = new pptxgen();
    var num_bhajans = data[0].length - 1;
    createBhajanMasterSlide(presentation);
    createTableSlide(presentation, data[0]);

    for (var i = 0; i < data[1].length; i++) {
        var slide = presentation.addSlide('BHAJAN_SLIDE');
        slide.addText(data[1][i][0].lyrics, { placeholder: 'lyrics'} );
        slide.addText(data[1][i][0].meaning, { placeholder: 'meaning'} );
    }
    
    presentation.writeFile('ExamplePres.pptx');
});

function createBhajanMasterSlide(pres) {
    pres.defineSlideMaster({
        title: 'BHAJAN_SLIDE',
        bkgd: 'f0f0f0',
        objects: [
            { 'placeholder': {
                options: { name: 'lyrics', type: 'body', x: '1%', y: '2%', w: '90%', h: '74%' },
                text: 'Lyrics will go here'
            } }, 
            { 'placeholder': {
                options: { name: 'meaning', type: 'body', x: '1%', y: '77%', w: '90%', h: '12%', fontSize:12 },
                text: 'Meaning will go here'
            } },
            { 'placeholder': {
                options: { name: 'current', type: 'body', x: '6%', y: '91.3%', color:'FFFFFF', fontSize:9 },
                text: 'Current bhajan will go here'
            } },
            { 'placeholder': {
                options: { name: 'next', type: 'body', x: '6%', y: '94.5%', color:'FFFFFF', fontSize:9 },
                text: 'Next bhajan will go here'
            } },
            { 'rect': {x:0.0, y:'90%', h:'10%', w:'100%', fill:'bcc3cc'} },
            { 'text': {text: 'Current:', options: { x:'0.5%', y:'91%', color:'FFFFFF', fontSize:9, bold: true} } },
            { 'text': {text: 'Next:', options: { x:'2%', y:'94%', color:'FFFFFF', fontSize:9, bold: true} } }
        ],
        slideNumber: {x:'96%', y:'94%', color:'FFFFFF', fontSize:9 }
    });
}

function createTableSlide(pres, rows) {
    var tabOpts = {
        x: "1%",
        y: "2%",
        w: "98%",
        fill: "f7f7f7",
        fontSize: 12,
        fontFace: "Arial",
        border: { pt: 0.4 }
    };
    var slide1 = pres.addSlide();
    slide1.addTable(rows, tabOpts);
}

app.on('ready', createWindow)
app.on('quit', closeWindow)