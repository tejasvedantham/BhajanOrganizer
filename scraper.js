var wtj = require('website-to-json');
var trim = require('trim');
const fs = require('fs');

wtj.extractData('http://prasanthi-mandir-bhajan.net/', {
   fields: ['data'],
   parse: function($) {
      //for (i = 0; i < 100; i++) {
         return {
            bhajans: $("body > ol:nth-child(10)").find("li").map(function(val) {
               var bhajan = {};

               title = $(this).find("span").find("a").find("strong").text();
               lyrics = $(this).find("span").text();
               meaning = $(this).find("p").find("span.mean").text();

               bhajan.title = title;
               bhajan.lyrics = lyrics;
               bhajan.meaning = meaning;

               return bhajan;
            }).get()
         }
      //}
   }
})
.then(function(res) {
   const output = JSON.stringify(res, null, 2);
   fs.writeFile('bhajans-master.json', output, (err) => {
      if (err) throw err;
      console.log("Bhajans-master saved successfully.");
   });

})
