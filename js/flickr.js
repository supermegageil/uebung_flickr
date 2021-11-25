/*
https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

flickr.interestingness.getList

4f0c7aacc8689e7a16060a7f710cf848
*/

const main = document.querySelector("main");
const frame = document.querySelector("#list");
const input = document.querySelector("#search");
const btn = document.querySelector(".btnSearch");
const loading = document.querySelector(".loading");
const errTxt = document.querySelector(".errTxt");
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "4f0c7aacc8689e7a16060a7f710cf848"
const per_page = 30;
const format = "json";

const url1 = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&privacy_filter=1`;

callData(url1);


btn.addEventListener("click", e=>{
   let tag = input.value;
   const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

   if(tag !=""){
      errTxt.style.display = "none";
      callDate(url);
      
   }else{
      console.log("검색어를 입력하세요");
      errTxt.innerText = "검색어를 입력하세요";
      errTxt.style.display = "block";

      frame.innerHTML = "";
   }
});

input.addEventListener("keypress", e=>{
   if(e.keyCode == 13){
      let tag = input.value;
      const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

      if(tag !=""){
         errTxt.style.display = "none";
         callData(url);
      }else{
         console.log("검색어를 입력하세요");
         errTxt.innerText = "검색어를 입력하세요";
         errTxt.style.display = "block";

         frame.innerHTML = "";
      }
   }
});

frame.addEventListener("click", e=>{
   e.preventDefault();

   let targer = e.target.closest(".item").querySelector(".thumb");
   if(e.target == frame) return;

   if(target == e.target){
      let imgSrc = target.parentElement.getAttribute("href");

      let pop = document.createElement("aside");
      pop.classList.add("pop");
      let pops = `
                  <div class="con">
                     <img arc="${imgSrc}">
                  </div>
                  <span class="close>close</span>   
                  `;
      pop.innerHTML = pops;
      main.appendChild(pop);            
   }
})

main.addEventListener("click", e=>{

   let pop = main.querySelector("pop");

   if(pop != null){
      let close = pop.querySelector(".pop .close");

      if(close == e.target) pop.remove();
   }
})


function callData(url){
   frame.innerHTML = "";
   loading.classList.remove("off");
   frame.classList.remove("on");

   fetch(url)
   .then(data =>{
      let result = data.json();
      return result;
   })
   .then(json =>{
      console.log(json);
      let items = json.photos.photo;
      console.log(items);

      if(items.length >0){
         createList(items);
         delayLoading();
      }else{
         console.log("검색하신 이미지의 데이터가 존재하지 않습니다.");
         loading.classList.add("off");
         errTxt.innerText = "검색하신 이미지의 데이터가 존재하지 않습니다";
         errTxt.style.display = "block";
      }


   })
}

function createList(items){
   let htmls ="";
   items.forEach(data=>{
      console.log(data);

      let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
      let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

      htmls+=`
               <li class="item">
                  <div>
                     <a href="${imgSrcBig}">
                     <img class="thumb" src="${imgSrc}">
                     </a>
                     <p>${data.title}</p>
                     <span>
                        <img class="profile" src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                        <strong>${data.owner}</strong>
                     </span>
               </div>
            </li>
         `;
   });


frame.innerHTML = htmls; 
}    

function delayLoading(){
   const imgs = frame.querySelectorAll("img"); 
   const len = imgs.length; 
   let count = 0; 

   for(let el of imgs){
      let thumb = el.closest(".item").querySelector(".thumb"); 
      thumb.onerror = e =>{         
         e.currentTarget.closest(".item").querySelector(".thumb").setAttribute("src", "k1.jpg"); 
      }
      let profile = el.closest(".item").querySelector(".profile"); 
      profile.onerror = e =>{         
         e.currentTarget.closest(".item").querySelector(".profile").setAttribute("src", "https://www.flickr.com/images/buddyicon.gif"); 
      }



      el.onload = ()=>{
         count++; 
         if(count === len) isoLayout(); 
      }

      
   }
}


function isoLayout(){
   loading.classList.add("off"); 

   frame.classList.add("on"); 
   errTxt.style.display = "none"; 

   new Isotope("#list",{
      itemSelector :".item", 
      columnWidth: ".item", 
      transitionDuration :"0.5s"
   })
}
