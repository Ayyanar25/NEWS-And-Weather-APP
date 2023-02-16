let loc =document.getElementById("locat-disp");
let tempicon=document.getElementById("temp-icon");
let tempvalue=document.getElementById("temp");
let climate=document.getElementById("climate");
let iconfile;
const input=document.getElementById("location");
const searchbtn=document.getElementById("btn");


searchbtn.addEventListener('click',(e)=>
{
    e.preventDefault();
    getWeather(input.value);
    getNews(input.value);
    input.value='';
});

function populateWeather(weatherData){
    const {name} = weatherData;
    const {feels_like}=weatherData.main;
    const {id,main}=weatherData.weather[0];
    
    loc.textContent=name;
    climate.textContent=main; 
    tempvalue.textContent=Math.round(feels_like-273);
    if(id<300 && id>200)
    {
        tempicon.src="./icons/thunderstorm.svg"
    }
    else  if(id<400 && id>300)
    {
        tempicon.src="./icons/cloud.svg"
    }
    else if(id<600&& id>500)
    {
        tempicon.src="./icons/rain.svg"
    }
    else  if(id<700 && id>600)
    {
        tempicon.src="./icons/snow.svg"
    }
    else  if(id<800 && id>700)
    {
        tempicon.src="./icons/clouds.svg"
    }
        else if(id==800)
    {
        tempicon.src="./icons/clouds-and-sun.svg"
    }
}

const getWeather = async(city)=>
{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf233f5e6dfe24f8d5a1d6f58d7a9a2e`);    
    if(response.status==404) alert("City not found");
    const weatherData = await response.json();
    populateWeather(weatherData)
};

async function getNews(city){  
    //${year-month-day}
    var date= new Date();
    

    var dat=date.getDate();
    var month=date.getMonth();
    var year=date.getFullYear();
    
    dat=dat < 10 ? "0"+dat:dat
    month=month < 10 ? "0"+month:month
    

    let newsapi=`https://newsapi.org/v2/everything?q=${city}&from=${year}-${month}-${dat}&sortBy=publishedAt&apiKey=4b1257c025964d56b12ddb06744023a8`; 
    const response = await fetch(newsapi);
    const resultJson = await (response.json());

    document.getElementsByClassName("lds-ring")[0].style.display = "none"

    let news = resultJson.articles;
    
    //iterate all news

    let allOldCards = document.querySelectorAll(".card")
    allOldCards.forEach(element => {
        element.remove();
    });

    for(let i = 0; i < news.length; i++){
        let author = news[i].author;
        let title = news[i].title;
        let description = news[i].description;
        let url = news[i].url;

        let newNewsElement = document.getElementById("news").content.cloneNode(true);
        newNewsElement.querySelector(".author").textContent=author;
        newNewsElement.querySelector(".title").textContent=title;
        newNewsElement.querySelector(".description").textContent=description;
        newNewsElement.querySelector(".url").setAttribute("href",url);
        document.getElementsByClassName("app")[0].appendChild(newNewsElement);

    }
    
    
}

function onLoadRunner(){
    getNews("india")
    let long;
    let lat;

    navigator.geolocation.getCurrentPosition(getDefaultWeather)
    async function getDefaultWeather(position){
        long=position.coords.longitude;
        lat=position.coords.latitude;
        const api =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=dab3af44de7d24ae7ff86549334e45bd`
        const response = await fetch(api);
        const jsonResponse = await response.json();
        populateWeather(jsonResponse)
    }
}

window.addEventListener("load", onLoadRunner);

setInterval(function () {
    var date= new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    var dat=date.getDate();
    var month=date.getMonth();
    var year=date.getFullYear();
    var day =date.getDay();

    var hours=date.getHours();
    var minutes=date.getMinutes();
    var secs=date.getSeconds();
    var am_pm= "AM"
    if (hours>=12) {
        hours=hours-12;
        am_pm="PM"
    }
    if (hours==0) {
        hours=12;
    }


    day=weekday[day]
    month= month+1
    dat=dat < 10 ? "0"+dat:dat
    month=month < 10 ? "0"+month:month
    hour=hours < 10 ? "0"+hours:hours
    var min=minutes < 10 ? "0"+minutes:minutes
    var sec=secs < 10 ? "0"+secs:secs
    var p1=document.getElementById("hour")
    var p2=document.getElementById("mins")
    var p3=document.getElementById("secs")
    var p4=document.getElementById("am_pm")
    var p5=document.getElementById("date")
    var p6=document.getElementById("month")
    var p7=document.getElementById("year")
    var p8=document.getElementById("day")
    p1.textContent=hour
    p2.textContent=min
    p3.textContent=sec
    p4.textContent=am_pm
    p5.textContent=dat
    p6.textContent=month
    p7.textContent=year
    p8.textContent=day
})








