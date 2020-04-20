$(document).ready(function () {
    const { ipcRenderer } = require('electron');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

    $('.menu .item').tab();

    $('#newBhajanForm').submit(function (event) {
        event.preventDefault();

        $('#newBhajanForm').removeClass('error');
        var newTitle = $('#newBhajanTitle').val();
        var newLyrics = $('#newBhajanLyrics').val();
        var newMeaning = $('#newBhajanMeaning').val();

        if (newTitle === "" || newLyrics === "" || newMeaning === "") {
            $('#newBhajanForm').addClass('error');
            return;
        }

        var newBhajan = $('#newBhajanForm').serializeArray();
        var newBhajan = objectifyForm(newBhajan);

        $('#confirm-bhajan-modal').modal({
            closable: false, 
            onShow: function (e) {
                $(this).find('#manage-modal-title').text(newBhajan.title);
                $(this).find('#manage-modal-lyrics').text(newBhajan.lyrics);
                $(this).find('#manage-modal-meaning').text(newBhajan.meaning);
            }, 
            onApprove: function (e) {
                myConsole.log("New Bhajan Approved");
                const bhajan_reply = ipcRenderer.sendSync('add-new-bhajan', newBhajan);
            }
        }).modal('show');
    })

    $('#newSingerForm').submit(function (event) { 
        event.preventDefault();

        $('#newSingerForm').removeClass('error');
        var newSingerName = $('#newSingerName').val()

        if (newSingerName === "") {
            $('#newSingerForm').addClass('error');
            return;
        }

        var newSinger = $('#newSingerForm').serializeArray();
        var newSinger = objectifyForm(newSinger);

        $("#confirm-singer-modal").modal({
            closable: false,
            onShow: function (e) {
                $(this).find('#manage-modal-singername').text(newSinger.name);
                $(this).find('#manage-modal-singergender').text(newSinger.gender);
            },
            onApprove: function (e) {
                myConsole.log("New Singer Approved");
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