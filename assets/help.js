$(document).ready(function() {
    const { shell } = require('electron');

    $('#help-link').click(function() {
        shell.openExternal('https://github.com/tejasvedantham/BhajanOrganizer');
    })
;});