$(document).ready(function () {
   const { shell, ipcRenderer } = require('electron');
   var nodeConsole = require('console');
   var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

   $('#search-online').click(function () {
      shell.openExternal('https://www.google.com/search?q=' + $('.prompt').val());
   });

   $("#search-bar").on("input", function () {

      $('#bhajan-cards').empty();

      var bhajan = $('.prompt').val();

      //Only perform search if there are >3 chars in the query
      if (bhajan.length < 3) {
         return;
      }

      //Send call to retrieve data from db
      const data = ipcRenderer.sendSync('bhajan-to-search', bhajan);
      $('#bhajan-cards').empty();
      for (var i = 0; i < data.length; i++) {
         renderCard(data[i]);
      }

   });

   function renderCard(bhajan) {

      //Modify bhajan card template
      $.get("../templates/bhajan_card_template.html", function (data) {
         var html = $(data);

         html.find('#card-header').text(bhajan.title);
         html.find('#card-meta').text("Bhajan");
         html.find('#card-description').text(bhajan.lyrics);

         html.find('#edit-view-button').click(function () {

            $('#modal-header').val(bhajan.title);
            $('#modal-lyrics').val(bhajan.lyrics);
            $('#modal-meaning').val(bhajan.meaning);

            $('#modal-for-card').modal({
               onApprove: function(e) {

                  var newTitle = $(this).find('#modal-header').val();
                  var newLyrics = $(this).find('#modal-lyrics').val();
                  var newMeaning = $(this).find('#modal-meaning').val();

                  const save_reply = ipcRenderer.sendSync('update-bhajan', [bhajan._id, newTitle, newLyrics, newMeaning]);
                  if (save_reply == 200) {
                     location.reload();
                  }
               },
            }).modal('show');


         });

         $('.ui.cards').append(html);
      });

   }

});