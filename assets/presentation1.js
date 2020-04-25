$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    const { dialog } = require('electron').remote;
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

    $('#create-button').click(function() {
        $('#page-content').load("../html_pages/presentation2.html", function() {
            $.getScript("../assets/presentation2.js");
        });
    });

    $('#open-button').click(function() {
        dialog.showOpenDialog({
            properties: ['openFile']
        }).then(result => {
            myConsole.log(result.canceled);
            myConsole.log(result.filePaths);
        }).catch(err => {
            myConsole.log(err);
        })
    });
});