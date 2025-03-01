# TO DO LIST

## **SkyWatch > Server > src > routes > htmlRoutes.ts**

1. Define route to serve index.html


## **SkyWatch > Server > src > routes > api > weatherRoutes.ts**

1. POST Request with city name to retrieve weather data
2. GET weather data from city name
3. save city to search history
4. GET search history
5. **BONUS:** DELETE city from search history


## **SkyWatch > Server > src > server.ts**

1. Serve static files of entire client dist folder
2. Implement middleware for parsing JSON and urlencoded form data
3. Implement middleware to connect the routes


## **SkyWatch > Server > src > service > historyService.ts**

1. Define a City class with name and id properties
2. Complete the HistoryService class
3. Define a read method that reads from the searchHistory.json file
4. Define a write method that writes the updated cities array to the searchHistory.json file
5. Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
6. Define an addCity method that adds a city to the searchHistory.json file
7.  **BONUS:** Define a removeCity method that removes a city from the searchHistory.json file


## **SkyWatch > Server > src > service > Service.ts**
1. Serve static files of entire client dist folder
2. Implement middleware for parsing JSON and urlencoded form data
3. Implement middleware to connect the routes
4. Start the server on the port


## **SkyWatch > Server > src > service > weatherService.ts**

1. Define an interface for the Coordinates object
2. Define a class for the Weather object
3. Complete the WeatherService class
4. Define the baseURL, API key, and city name properties
5. Create fetchLocationData method
6. Create destructureLocationData method
7. Create buildGeocodeQuery method
8. Create buildWeatherQuery method
9. Create fetchAndDestructureLocationData method
10. Create fetchWeatherData method
11. Build parseCurrentWeather method
12. Complete buildForecastArray method
13. Complete getWeatherForCity method
