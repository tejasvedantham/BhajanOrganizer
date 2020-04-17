$(document).ready(function () {
    const { ipcRenderer } = require('electron');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

    $('.menu .item').tab();

    $('.ui.bhajan.form').submit(function (event) {
        event.preventDefault();

        $('.ui.bhajan.form').removeClass('error');
        var newTitle = $('#newBhajanTitle').val();
        var newLyrics = $('#newBhajanLyrics').val();
        var newMeaning = $('#newBhajanMeaning').val();

        if (newTitle === "" || newLyrics === "" || newMeaning === "") {
            $('.ui.bhajan.form').addClass('error');
            return;
        }

        var newBhajan = $('.ui.bhajan.form').serializeArray();
        var newBhajan = objectifyForm(newBhajan);

        $('#manage-modal-title').text(newBhajan.title);
        $('#manage-modal-lyrics').text(newBhajan.lyrics);
        $('#manage-modal-meaning').text(newBhajan.meaning);

        $('.ui.bhajans.modal').modal({
            onApprove: function (e) {
                const bhajan_reply = ipcRenderer.sendSync('add-new-bhajan', newBhajan);
                if (bhajan_reply == 200) {
                    myConsole.log("New Bhajan added successfully!");
                }
            },
        }).modal('show');
    })

    $('.ui.singers.form').submit(function (event) {
        event.preventDefault();

        $('.ui.singers.form').removeClass('error');
        var newSingerName = $('#newSingerName').val()
        var newSingerGender = $('input[name=gender]:checked', '#newSingerForm').val();

        if (newSingerName === "") {
            $('.ui.singers.form').addClass('error');
            return;
        }

        var entry = $('.ui.singers.form').serializeArray();
        var newSinger = objectifyForm(entry);

        const singer_reply = ipcRenderer.sendSync('add-new-singer', newSinger);
        if (singer_reply == 200) {
            myConsole.log("--- Added new singer to DB ---");
            $('.ui.singers.modal')
                .modal('show')
                .delay(2000)
                .queue(function () {
                    $(this).modal('hide').dequeue();
                });
        }
    });

    function objectifyForm(formArray) {

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++) {
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
});