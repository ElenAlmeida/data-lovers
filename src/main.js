window.onload = function() {
    displayNews(allNews);
    feedDropListDates();
};

let formatDate = (date) => {
	let newDate = new Date(date*1000);
	let fixed = `${newDate.getFullYear()}-${newDate.getMonth() + 1 }-${newDate.getDate()}`;
	return fixed;
};

let originalObj = STEAM["appnews"]["newsitems"]; 
const allNews =  originalObj.map(item => {  return {...item, date2: formatDate(item.date)}  })
const newsDiv = document.querySelector("#news-container");  
const totalOfNews = document.querySelector(".total-sum-news");
const newsChannels = document.querySelector('#newsChannels');
const dropListDate = document.querySelector(".drop-list-date");
const sortList = document.querySelector(".sort-list");
const uniqueDates = [...new Set(allNews.map(word => word.date2))];


let feedDropListDates = () => {
    for (date of uniqueDates){
        let option = document.createElement("option");
        option.setAttribute("value", date);
        option.setAttribute("class", "drop-option-date");
        option.textContent = date;
        dropListDate.appendChild(option);
    }
};
    

let displayNews = (filteredNews) => {
    newsDiv.innerHTML = `${filteredNews.map((materia) => `
    <div class="news-style"> 
        <h2 class="news-title">${materia["title"]} </h2>
        <h3 class="news-date">${formatDate(materia["date"])} </h3>
        <p class="news-text"> ${materia["contents"]} </p>
	</div>
  `).join("")}
  `
    let sumFilteredNews = Object.keys(filteredNews).length;
    totalOfNews.innerHTML = `<p>Foi encontrado um total de ${sumFilteredNews} notícias para seu filtro</p>`  
}; 

dropListDate.addEventListener("change", loadByDate);

function loadByDate() {
    let dateChosen = dropListDate.value;
    if (dateChosen){
        let filteredNews = allNews.filter((materia) => {
			  return materia.date2 === dateChosen
        });
      displayNews(filteredNews);
		
    }
    else {
        displayNews(allNews);
	}
};

newsChannels.addEventListener('change', filter); 

function filter(){ 
  let newsDiv = document.querySelector("#news-container");  
  newsDiv.innerHTML='';
  let channel = newsChannels.value;  
  let filteringChannel = STEAM.appnews['newsitems'];  
  let agora = 1;
  for (let subjectMatter of filteringChannel){ 
    if(channel===subjectMatter.feedname){  
      let isso=agora++;
      let title=subjectMatter.title
      let date= new Date((subjectMatter.date)*1000).toDateString()
      let contents=subjectMatter.contents
      print( title, date, contents);
    }
  }
} 

function print(title, date, contents){    
    let result = document.createElement('div') 
    let template= `
    <h2>${title}</h2>
    <p>${date}</p>
    <p>${contents}</p>      
    ` 
    result.innerHTML=template;     
    newsDiv.appendChild(result)
}

sortList.addEventListener("change", sortedByDate);

function sortedByDate() {
	let sortChosen = sortList.value;
	if (sortChosen === "oldest") {
		let upward = allNews.sort((a,b) => new Date(a.date) - new Date(b.date));
		displayNews(upward);
	}
	else if (sortChosen === "latest") {
		let downward = allNews.sort((a,b) => new Date(b.date) - new Date(a.date));
		displayNews(downward);
	}
};



