const {shell, ipcRenderer } = require('electron');
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

$('#search-online').click(function() {
   shell.openExternal('https://www.google.com/search?q=' + $('.prompt').val());
});

// newHtml = $("<div class='ui raised card'>")
//    .append($("<div class='content'>")
//       .append("<div class='header'>Sample</div>")
//       .append("<div class='meta'>Friend</div>")
//       .append("<div class='description'>Sample Sample Sample</div>"));
      
$("#search-bar").on("input", function() {

   $.get("../bhajan-card-template.html", function(data) {
      $('.ui.cards').append(data);
   });

   var bhajan = $('.prompt').val();
   
   //Only perform search if there are >3 chars in the query
   if (bhajan.length < 3) {
      return;
   }

   //Send call to retrieve data from db
   ipcRenderer.send('bhajan-to-search', bhajan);
});
