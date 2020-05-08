$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    var allBhajans = [];

    $('#generate-button').click(function() {
        myConsole.log("Generate button clicked");
        const table = ipcRenderer.sendSync('get-table-info');
        
        for (var i = 1; i < table.length; i++) {
            const bhajan = ipcRenderer.sendSync('get-bhajan-for-pres', table[i][0].text);
            allBhajans.push(bhajan);
        }

        ipcRenderer.send('generate-ppt', [table, allBhajans]);
    });
    $('#back-button').click(function() {
        $('#page-content').load("../html_pages/presentation2.html", function() {
            $.getScript("../assets/presentation2.js");
        });
    });
});