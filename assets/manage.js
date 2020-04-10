$(document).ready(function() {
    $('.menu .item').tab();

    $('.ui.bhajan.form').submit(function(event) {
        event.preventDefault();

        $('.ui.bhajans.modal').modal('show');
    })
});