$(document).ready(function() {
    $('.menu .item').tab();

    $('.ui.bhajan.form').submit(function(event) {
        event.preventDefault();

        $('.ui.bhajans.modal').modal('show');
    })

    $('.ui.singers.form').submit(function(event) {
        event.preventDefault();

        $('.ui.singers.modal').modal('show');
    });
});