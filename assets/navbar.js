$('#sidebar-button').click(function() {
    $('.ui.sidebar').sidebar('toggle');
 });

 $('div.sidebar-items > a').click(function() {
    $(this).attr('class', 'active item');
    $(this).siblings().attr('class', 'item');

    $(this).find('i').addClass('teal');
    $(this).siblings().find('i').removeClass('teal');

    $('.ui.sidebar').sidebar('toggle');
 });