/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = "&appid=ddc5d68737eeb982e8d17af9682899bb&units=imperial";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);
// on performAction
/* Function called by event listener */
function performAction(e){
const newZip =document.getElementById('zip').value;
const feelings = document.getElementById('feelings').value;
getWeather(baseURL,newZip, apiKey)
   .then(function(data){
    console.log(data);

    postData('/add',{temperature: data.main.temp, date: newDate, userResponse:feelings})
    .then(res => updateUI(res));
    
    })

}; 

// Get weather data from the weather API
 const getWeather =async(baseURL,zip,key)=>{
     const res =await fetch(baseURL+zip+key)
     try{
         const data =await res.json();
         return data;
     }catch(error){
         console.log("error",error);
     }
 }

 // Async POST
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};
// Async GET if no data is passed

const updateUI = async (data) =>{ 
   // if(!data){
    const request = await fetch('/all');
   // try {
    // Transform into JSON

    const allData = await request.json();

   // }
   // catch(error) {
      console.log("error", error);
      // appropriately handle the error
   // }
 // }
  document.getElementById('date').innerHTML = `Data is :${data.date}`;
  document.getElementById('temp').innerHTML = `Temp is :${data.temperature}`;
  document.getElementById('content').innerHTML = `my feeling is :${data.userResponse}`;
};