const {shell, ipcRenderer } = require('electron');
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

$('#search-online').click(function() {
   shell.openExternal('https://www.google.com/search?q=' + $('.prompt').val());
});

newHtml = $("<div class='ui raised card'>")
   .append($("<div class='content'>")
      .append("<div class='header'>Sample</div>")
      .append("<div class='meta'>Friend</div>")
      .append("<div class='description'>Sample Sample Sample</div>"));
      
$("#search-bar").on("input", function() {
   $(".ui.cards").append(newHtml);
});
