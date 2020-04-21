$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    const fs = require('fs');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    
    const singers = ipcRenderer.sendSync('get-singers-dropdown');
    const singersArray = [];

    $('#bhajan-dropdown').dropdown({
        clearable: true,
        minCharacters: 3,
        onChange: function(value, text, $selectedItem) {
            $('#bhajan-dropdown').removeClass('error');
            const bhajan_reply = ipcRenderer.sendSync('get-all-bhajans');
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
    
    singers.forEach(element => {
        singersArray.push(element.name);
    });
    
    $.each(singersArray, function(i, p) {
        $('#singers-names').append($('<div class="item"></div>').val(p).html(p));
    })
    
    $('#add-bhajan-button').click(function() {
        $('#add-bhajan-pres').modal({
            closable: false,
            onApprove: function (e) {
                if ($('#bhajan-dropdown').find(":selected").text() === "") {
                    $('#bhajan-dropdown').addClass('error');
                    return false;
                }
                if ($('#singers-dropdown').find(":selected").text() === "") {
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





