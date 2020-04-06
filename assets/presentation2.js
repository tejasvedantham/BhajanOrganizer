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
        $('.ui.modal').modal('show');
    })

    $('.ui.form').submit(function(event) {
        event.preventDefault();

        myConsole.log("-----Submitted-----");

        var data = fs.readFileSync('current-presentation.json');

        var bhajanArray = $('.ui.form').serializeArray();
        bhajanArray = objectifyForm(bhajanArray);

        var currData = JSON.parse(data);
        currData.bhajans.push(bhajanArray);

        let newData = JSON.stringify(currData, null, 2);
        fs.writeFileSync("current-presentation.json", newData);

        $('#bhajans-table').empty();
        renderBhajanEntries();
        
    });

    $('#next-button').click(function() {
        myConsole.log("Next button clicked");
    });

    function renderBhajanEntries() {
        $.get("../templates/bhajan-entry-template.html", function(data) {

            var bhajanData = fs.readFileSync('current-presentation.json');
            var bhajanData = JSON.parse(bhajanData);

            bhajanData.bhajans.forEach((element) => {
                let html = $(data);

                html.find('.bhajan-title').text(element.bhajanfield);
                html.find('.singer').text(element.singersfield);
                html.find('.gender').text("Singer gender");
                html.find('.scale').text(element.scalefield + " " + element.scaletypefield);
    
                $('#bhajans-table').append(html);
            });
                 
        });
    }

    function objectifyForm(formArray) {

        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
          returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
});





