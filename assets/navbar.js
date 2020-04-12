$(document).ready(function() {
   $('#page-content').load('../html_pages/index.html');

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
         $('#page-content').load("../html_pages/index.html", function() {
            $.getScript("../assets/index.js");
         });

      } else if ($(this).attr("id") == "presentation-button") {
         $('#page-content').html('');
         $('#page-content').load("../html_pages/presentation2.html", function() {
            $.getScript("../assets/presentation2.js");
         });

      } else if ($(this).attr("id") == "search-button") {
         $('#page-content').html('');
         $('#page-content').load("../html_pages/search.html", function() {
            $.getScript("../assets/search.js");
         });
         
      } else if ($(this).attr("id") == "manage-button") {
         $('#page-content').html('');
         $('#page-content').load("../html_pages/manage.html", function() {
            $.getScript("../assets/manage.js");
         });
      }
   
      $('.ui.sidebar').sidebar('toggle');
   });
});

