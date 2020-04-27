$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

    $('#create-button').click(function() {
        $('#page-content').load("../html_pages/presentation2.html", function() {
            $.getScript("../assets/presentation2.js");
        });
    });

    $('#open-button').click(function() {
        const open_reply = ipcRenderer.sendSync('open-presentation');
        myConsole.log(open_reply);
    });
});