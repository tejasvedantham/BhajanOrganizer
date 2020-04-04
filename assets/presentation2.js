$(document).ready(function() {
    const { ipcRenderer } = require('electron');
    const fs = require('fs');
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

        var data = fs.readFileSync('current-presentation.json');

        var bhajanArray = $('.ui.form').serializeArray();
        bhajanArray = objectifyForm(bhajanArray);

        var currData = JSON.parse(data);
        currData.push(bhajanArray);

        let newData = JSON.stringify(currData, null, 2);
        fs.writeFileSync("current-presentation.json", newData);
        
    });

    $('#next-button').click(function() {
        
    });

    function objectifyForm(formArray) {

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
          returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
});





