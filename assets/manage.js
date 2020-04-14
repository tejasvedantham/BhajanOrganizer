$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

    $('.menu .item').tab();

    $('.ui.bhajan.form').submit(function(event) {
        event.preventDefault();

        $('.ui.bhajans.modal').modal('show');
    })

    $('.ui.singers.form').submit(function(event) {
        event.preventDefault();

        var newSingerName = $('#newSingerName').val() 
        var newSingerGender = $('input[name=gender]:checked', '#newSingerForm').val();
        $('#singerText').html(newSingerName);
        $('#genderText').html(newSingerGender);
        $('.ui.singers.modal').modal('show');
    });

    $('.ui.singers.modal').submit(function(event) {
        event.preventDefault();

        var entry = $('.ui.singers.form').serializeArray();
        var newSinger = objectifyForm(entry);

        const reply = ipcRenderer.sendSync('add-new-singer', newSinger);
        if (reply == 200) {
            myConsole.log("Added new singer successfully");
        }
    });

    $('.ui.bhajans.modal').submit(function(event) {

    });

    function objectifyForm(formArray) {

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
          returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
});