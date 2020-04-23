$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    const fs = require('fs');
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    
    const singers = ipcRenderer.sendSync('get-singers-dropdown');
    const bhajans = ipcRenderer.sendSync('get-bhajans-dropdown');
    const singersArray = [];
    const bhajansArray = [];

    singers.forEach(element => {
        singersArray.push({name: element.name, value: element.name});
    });
    bhajans.forEach(element => {
        bhajansArray.push({name: element.title + "\\n" + element.lyrics, value: element._id});
    });

    $('#bhajan-dropdown').dropdown({
        values: bhajansArray,
        clearable: true,
        minCharacters: 3
    });
    $('#singers-dropdown').dropdown({
        values: singersArray,
        clearable: true,
        allowAdditions: true
    });
    $('#scale-dropdown').dropdown();
    $('#scaletype-dropdown').dropdown();
    
    $('#add-bhajan-button').click(function() {
        $('#add-bhajan-pres').modal({
            closable: false,
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





