window.addEventListener("load", () => {
    //Declaration
     let lat;
     let long;
     let itCelcius = true;
     let skycons= new Skycons({"color":"white"})
     const city = document.querySelector(".city");
     const country = document.querySelector(".country");
     const icon = document.querySelector(".icon");
     const iconDetails = document.querySelector(".icon-details");
     const degree = document.querySelector(".degree");
     const degreeContainer = document.querySelector(".degree-container")
     const degreeUnit = document.querySelector(".degree-unit");
     const wind = document.querySelector(".wind");
     const humidity = document.querySelector(".humidity");
     //Api Configuration Settings
     const apiconfig = {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "aa31b55f0fmshf90457633b3f06dp162edbjsn2d604218181b",
            "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com"
        }
    }
     //Checking if Location is Enabled on the browser
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(res => {
             //Getting the geolocation of the user
          lat = res.coords.latitude;
          long = res.coords.longitude;
          //Embedding the geolocation details i got from the user into the API
          const api = `https://yahoo-weather5.p.rapidapi.com/weather?lat=${lat}&long=${long}&format=json&u=c`;   
           //Fetching for the API
          fetch(api, apiconfig)
                   //Converting the data i recieve into jason
                        .then(response => {
                            return response.json();
                        })
                        //Extracting & Displaying the needed data to the user
                        .then(data => {
                             const condition = data.current_observation.condition;
                             const location = data.location;
                             const {temperature, text} = condition;
                             const {city:cities, timezone_id, country:countries} = location;
                             const humidities = data.current_observation.atmosphere.humidity;
                             const winds =  data.current_observation.wind.speed;
                             console.log(data);
                             degree.textContent = temperature;
                             city.textContent = cities;
                             country.textContent = timezone_id;
                             iconDetails.textContent = text;
                             wind.textContent = winds;
                             humidity.textContent = humidities;
                             skycons.add("icon", text);
                             skycons.play();
                             //Toggling the temperature units once the user clicks it
                             degreeContainer.addEventListener('click', () => {
                               
                                if (itCelcius) {
                                      itCelcius = false;
                                      const fahrehit = (temperature * 9/5) + 32;
                                      degreeUnit.textContent = "F";
                                      degree.textContent = fahrehit;
                                        }
                                else if (itCelcius === false) {
                                          itCelcius = true;
                                          degreeUnit.textContent = "C";
                                          degree.textContent = temperature;
                                }
                            })

                        })
                        //Cathing any error that occures from the api
                        .catch(err => {
                            console.log(err)
                        })
                      
            });
     }
     else {
         alert("Enable Location For This Site To Work Properly")
     }
});

alert("Enable Location For This Site To Work Properly")