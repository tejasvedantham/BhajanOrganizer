$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    const { fs } = require('fs');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    
    const singers = ipcRenderer.sendSync('get-singers-list');
    const singersArray = [];
    
    singers.forEach(element => {
        singersArray.push(element.name);
    });
    
    $.each(singersArray, function(i, p) {
        $('#singers-dropdown').append($('<option></option>').val(p).html(p));
    })
    
    $('#add-bhajan-button').click(function() {
        $('.ui.modal').modal('show');
    })

    $('.ui.form').submit(function(event) {
        myConsole.log("-----Submitted-----");
        var bhajanArray = $('.ui.form').serializeArray();
        bhajanArray = objectifyForm(bhajanArray);
        myConsole.log(bhajanArray);
    });

    function objectifyForm(formArray) {

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
          returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
});





