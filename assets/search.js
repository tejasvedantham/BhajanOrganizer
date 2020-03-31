const {shell, ipcRenderer } = require('electron');
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

$('#search-online').click(function() {
   shell.openExternal('https://www.google.com/search?q=' + $('.prompt').val());
});
      
$("#search-bar").on("input", function() {

   var bhajan = $('.prompt').val();
   
   //Only perform search if there are >3 chars in the query
   if (bhajan.length < 3) {
      return;
   }

   //Send call to retrieve data from db
   ipcRenderer.send('bhajan-to-search', bhajan);

   //Call back function for db query that returns array of bhajans
   ipcRenderer.on('bhajans-list-found', function(event, data) {
      myConsole.log("Bhajans list returned : Length " + data.length);
      myConsole.log(data[0]);
      
      for (var i = 0; i < data.length; i++) {
         renderCard(data[i]);
      }

   });

});

function renderCard(bhajan) {

   //Modify bhajan card template
   $.get("../bhajan-card-template.html", function(data) {
      var html = $(data);

      html.find('.header').text(bhajan.title);
      html.find('.meta').text("Bhajan");
      html.find('.description').text(bhajan.lyrics);

      $('.ui.cards').append(html);
   });

}
