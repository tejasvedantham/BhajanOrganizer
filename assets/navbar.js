$(document).ready(function() {
   $('#sidebar-button').click(function () {
      $('.ui.sidebar').sidebar('toggle');
   });
   
   $('div.sidebar-items > a').click(function () {
      $(this).attr('class', 'active item');
      $(this).siblings().attr('class', 'item');
   
      $(this).find('i').addClass('teal');
      $(this).siblings().find('i').removeClass('teal');
   
      if ($(this).attr("id") == "home-button") {
         $('#page-content').html('');
         $('#page-content').load("../html_pages/index.html");
      } else if ($(this).attr("id") == "presentation-button") {
         $('#page-content').html('');
         $('#page-content').load("../html_pages/presentation2.html");
      } else if ($(this).attr("id") == "search-button") {
         $('#page-content').html('');
         $('#page-content').load("../html_pages/search.html");
      }
   
      $('.ui.sidebar').sidebar('toggle');
   });
});

