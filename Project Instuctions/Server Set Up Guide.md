The first step to set up your server and run your application from your terminal is to ensure you have all the necessary dependencies installed. Follow these steps:

1. **Navigate to the project directory**:
   Open a terminal or command prompt and navigate to your project directory: (your path may vary)
   ```sh
   cd /c/Bootcamp/GitHub/SkyWatch
   ```

2. **Install dependencies**:
   Run the following command to install all required dependencies for both the client and server:
   ```sh
   npm run install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the server directory and add your OpenWeather API key:
   ```sh
   echo "API_KEY=your_openweather_api_key" > server/.env
   ```

4. **Build the project**:
   Navigate to the server directory and build the project:
   ```sh
   cd server
   npm run build
   ```

5. **Run the application**:
   Start the server:
   ```sh
   npm start
   ```

6. **Run the client**:
   Open a second terminal, navigate to the client directory, and start the client:
   ```sh
   cd /c/Bootcamp/GitHub/SkyWatch/client
   npm run dev
   ```

This will start both the server and the client, and you should be able to access your application in the browser.