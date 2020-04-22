$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    const fs = require('fs');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    
    const singers = ipcRenderer.sendSync('get-singers-dropdown');
    const bhajans = ipcRenderer.sendSync('get-bhajans-dropdown');
    const singersArray = [];
    const bhajansArray = [];
    var selectedBhajanID;

    singers.forEach(element => {
        singersArray.push(element.name);
    });
    $.each(singersArray, function(i, p) {
        $('#singers-names').append($('<div class="item"></div>').val(p).html(p));
    })
    bhajans.forEach(element => {
        bhajansArray.push({title: element.title, lyrics: element.lyrics, id: element._id});
    });
    $.each(bhajansArray, function (i, p) {
        $('#bhajan-names').append($('<div style="white-space: pre-line" class="item"></div>').val(p.id).html(p.title + "\r\n" + p.lyrics));
    });

    $('#bhajan-dropdown').dropdown({
        clearable: true,
        minCharacters: 3,
        onChange: function(value, text, $selectedItem) {
            $('#bhajan-dropdown').removeClass('error');
            selectedBhajanID = $selectedItem[0].value;
        }
    });
    $('#singers-dropdown').dropdown({
        clearable: true,
        allowAdditions: true,
        onChange: function() {
            $('#singers-dropdown').removeClass('error');
        }
    });
    $('#scale-dropdown').dropdown({
        clearable: true
    });
    $('#scaletype-dropdown').dropdown({
        clearable: true
    });
    
    $('#add-bhajan-button').click(function() {
        $('#add-bhajan-pres').modal({
            closable: false,
            onApprove: function (e) {
                if ($('#bhajan-dropdown').dropdown('get value') === "") {
                    $('#bhajan-dropdown').addClass('error');
                    return false;
                }
                if ($('#singers-dropdown').dropdown('get value') === "") {
                    $('#singers-dropdown').addClass('error');
                    return false;
                }
                var bhajanToAdd = $('#addToPres-form').serializeArray();
                var bhajanToAdd = objectifyForm(bhajanToAdd);

                const reply = ipcRenderer.sendSync('add-bhajan-to-pres', bhajanToAdd);
            }
        }).modal('show');
    })

    $('#next-button').click(function() {
        myConsole.log("Next button clicked");
    });

    function objectifyForm(formArray) {

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
          returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
});





