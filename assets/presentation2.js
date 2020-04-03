const { ipcRenderer } = require('electron');
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const singers = ipcRenderer.sendSync('get-singers-list');
const singersArray = [];

singers.forEach(element => {
    singersArray.push(element.name);
});
$('#singers-dropdown').empty();
$.each(singersArray, function(i, p) {
    $('#singers-dropdown').append($('<option></option>').val(p).html(p));
})

$('#add-bhajan-button').click(function() {
    $('.ui.modal').modal('show');
})



