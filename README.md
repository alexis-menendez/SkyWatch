#  SkyWatch
##  **Description**

SkyWatch is a weather dashboard application that allows users to retrieve current and 5-day weather forecasts for multiple cities using the OpenWeather API. The application provides real-time weather data, including temperature, wind speed, humidity, and weather conditions, and stores previously searched cities for quick access.

**Key Features**

* Fetches real-time weather data using OpenWeather API.
* Displays current weather conditions, including city name, temperature, humidity, wind speed, and an icon representation of weather.
* Provides a 5-day weather forecast for the searched city.
* Stores previously searched cities in a history list for easy access.
* Enables users to retrieve and delete stored searches.
* Responsive and intuitive user interface.

**Technology Stack**

* **Front-End:** HTML, CSS, Bootstrap, TypeScript, Vite
* **Back-End:** Node.js, Express, TypeScript
* **API Integration:** OpenWeather API (Geocoder, 5 Day Forecast)
* **Storage:** JSON-based search history file

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Deployment](#deployment)
* [Walkthrough Video](#walkthrough-video)
* [API Calls](#api-calls)
* [Contributing](#contributing)
* [Tests](#tests)
* [Documentation](#documentation)
* [Questions](#questions)


## Installation

To set up and run this project on your local machine, follow these steps:

1. Before installing, ensure you have the following installed on your system:
	* [Node.js](https://nodejs.org/)
	* npm (Comes bundled with Node.js)
	* TypeScript (Installed as a dependency in this project)
   
2. Clone the [SkyWatch](https://github.com/alexis-menendez/SkyWatch) repository to your local machine:
	* Open a terminal or command prompt and run:
	  * git clone <(https://github.com/alexis-menendez/SkyWatch)>

3. Navigate to the project directory:
	* cd your-project-folder

4. Install Dependencies:
	* Run the following command to install all required dependencies:
	  * npm run install
	  * This will install required dependencies for both client and server.

5. Set up environment variables:
	* Create a .env file in the server directory and add your OpenWeather API key by running:
	  * API_KEY=your_openweather_api_key

6. Build the project:
	* In the terminal, navigate to the server directory:
	* cd /c/project-directory/server
 	* In the terminal, run:
	  * npm run build
	* This compiles TypeScript files and prepares the project for execution.

7. Run the Application:
	* In the terminal, still in the server directory run:
	  * npm start
	  * This starts the server & client.
	* In a second terminal, navigate to the client directory:
  	  * cd /c/project-directory/client
   	* In a second terminal, run:
	  * npm run dev
    	  * This opens the client in the browser.

## Usage

1. Run the application using command:
	* npm start
2. Enter a city name in the search bar and click Search.
3. View the current weather conditions and the 5-day forecast.
4. Click on any city in the search history to view its weather data again.
5. Delete a city from the search history if needed.

## Deployment

This project is deployed on [Render](https://render.com/) to make it accessible online.

### Live Application
You can access the deployed SkyWatch application here:  
🔗 **[SkyWatch Live Deployment](https://your-app-name.onrender.com)**  

### How Deployment Works
- The backend (server) is deployed as a **Render Web Service**.
- The frontend (client) is deployed as a **Render Static Site**.
- The application is automatically updated with each new commit to the GitHub repository.

## Walkthrough Video

* [Walkthrough Video](https://drive.google.com/LINK/GOES/HERE)

## API Calls

When a user searches for a city, the application follows this process to retrieve and display weather data:

- In the browser, when you click the "Search" button, the **Client** grabs the city name you typed and calls the **Backend Server**
- The **Server** grabs the city name from the **Client** and uses it to call the **[Open Weather Geocoder Api](https://openweathermap.org/api/geocoding-api)**  
- The **[Open Weather Geocoder Api](https://openweathermap.org/api/geocoding-api)** converts the city name into latitude and logitude data
- The **Server** grabs the latitude and logitude data from the **[Open Weather Geocoder API](https://openweathermap.org/api/geocoding-api)** and uses it to call the **[Open Weather 5 Day Forecast API](https://openweathermap.org/forecast5)**
- The **Server** grabs the forecast data from the **[Open Weather 5 Day Forecast API](https://openweathermap.org/forecast5)**
- The **Server** saves the data in json storage
- The **Server** sends the data to frontend

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes and create a pull request.


## Tests

There are currently no automated tests for this project

## Documentation

* [OpenWeather API Documentation](https://openweathermap.org/api)
* [Open Weather Geocoder Api](https://openweathermap.org/api/geocoding-api)
* [Open Weather 5 Day Forecast API](https://openweathermap.org/forecast5)
* [Project Repository](https://github.com/alexis-menendez/SkyWatch)
* [Live Deployment](https://your-app-name.onrender.com)
* [Walkthrough Video](https://drive.google.com/LINK/GOES/HERE)

## Acknowledgements

* I used Github Copilot to help me write the code for this project, primarily its suggestive text feature which enabled me to write code faster.
* I also used ChatGPT to:
  	* Provide assitance debugging my code. I am happy to provide transcripts of the conversation with ChatGPT upon request.
  	* Review my completed project and offer suggestions for improvement.
  	* Create detailed explanations for certain concepts which informed my writing.

## Contact

If you have any questions, feel free to contact me:

*  **GitHub**: [alexis-menendez](https://github.com/alexis-menendez)
*  **Email**: alexis.menendez@austincc.edu

