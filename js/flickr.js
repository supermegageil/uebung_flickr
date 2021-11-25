/*
https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

flickr.interestingness.getList

4f0c7aacc8689e7a16060a7f710cf848
*/

const base = "https://www.flickr.com/services/rest/?"
const method1 = "flickr,interestingness.getList";
const api_key = "4f0c7aacc8689e7a16060a7f710cf848"
const per_page = 50;
const format = "json";

const url = `${base}method=${method1}&api_key=${api_key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;


fetch(url)
   .then(data => {
      let result = data.json();
      return result;
   })
   .then(json => {
      let items = json.photos.photo;
   })

