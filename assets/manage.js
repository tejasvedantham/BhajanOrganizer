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

        $('.ui.bhajans.modal').modal({
            closable: false, 
            onShow: function (e) {
                $('#manage-modal-title').text(newBhajan.title);
                $('#manage-modal-lyrics').text(newBhajan.lyrics);
                $('#manage-modal-meaning').text(newBhajan.meaning);
            }, 
            onApprove: function (e) {
                const bhajan_reply = ipcRenderer.sendSync('add-new-bhajan', newBhajan);
            }
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

        var newSinger = $('.ui.singers.form').serializeArray();
        var newSinger = objectifyForm(newSinger);

        $('.ui.singers.modal').modal({
            closable: false,
            onShow: function (e) {
                $('#manage-modal-singername').text(newSinger.name);
                $('#manage-modal-singergender').text(newSinger.gender);
            },
            onApprove: function (e) {
                const singer_reply = ipcRenderer.sendSync('add-new-singer', newSinger);
            }
        }).modal('show');
    });

    function objectifyForm(formArray) {

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++) {
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
});