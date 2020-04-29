$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

    $('#generate-button').click(function() {
        myConsole.log("Generate button clicked");
        ipcRenderer.send('generate-ppt');
    });
    $('#back-button').click(function() {
        $('#page-content').load("../html_pages/presentation2.html", function() {
            $.getScript("../assets/presentation2.js");
        });
    });
});