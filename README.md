# Description
CharacterSpotlight is a web application focused on Star Wars characters and movies. It allows users to view a list of Star Wars characters and movies. Additionally, logged-in users can create, update, and delete characters and movies. When creating a movie, users can select characters from the existing character list, which is stored in the application's database.

How to Run the Application Locally
Follow these steps to run CharacterSpotlight on your computer:

## 1. Clone the Repository

   ```bash
    git clone https://github.com/your-username/CharacterSpotlight.git
    cd CharacterSpotlight
   ```
## 2. Install Dependencies
Use npm to install the required dependencies. Make sure you have Node.js and npm installed on your machine.

    ```bash
    npm install
    ```
##  3. Set Environment Variables
CharacterSpotlight uses environment variables to store sensitive information and configuration settings. To set up these variables, follow these steps:

Create a .env file in the root directory of the project.

Add the following environment variables to the .env file:

DATABASE_URL: The URL to your database, e.g., PostgreSQL or MongoDB connection string.
CLOUDINARY_URL: Your Cloudinary API key, secret, and cloud name if you are using Cloudinary for image storage.
You may need additional variables depending on your configuration, such as API keys for external services.

## 4. Start the Application
You can start the application using the following command:
    ```bash
    npm run dev
    ```
This command will start the development server, and you can access the application in your web browser at http://localhost:3000.

Usage
Once the application is running, you can interact with it through the following routes:

/characters: View the list of Star Wars characters.
/movies: View the list of Star Wars movies.
To create, update, or delete characters and movies, make sure you are logged in as an authorized user. The user interface should provide options for these actions when you are authenticated.

# Additional Information
This project was scaffolded using the IronLauncher npm package.
For any issues or questions, please feel free to contact the project maintainer.

Enjoy exploring the Star Wars universe with CharacterSpotlight! 🌟🚀
https://character-spotlight.adaptable.app/ 
 
