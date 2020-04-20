$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    const fs = require('fs');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    
    const singers = ipcRenderer.sendSync('get-singers-dropdown');
    const singersArray = [];
    
    singers.forEach(element => {
        singersArray.push(element.name);
    });
    
    $.each(singersArray, function(i, p) {
        $('#singers-dropdown').append($('<option></option>').val(p).html(p));
    })
    
    $('#add-bhajan-button').click(function() {
        $('#add-bhajan-pres').modal({
            onApprove: function (e) {
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





