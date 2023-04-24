# BigData

## Music recommended system based on facial recognition emotion.

### MVP: Personalized music recommendation, using facial recommendation to create a set of playlists that match the mood of the user.

----------------------------------------------------------

## Backend

Note: the basic setup for this backend was built using [this Youtube video](https://www.youtube.com/watch?v=7CqJlxBYj-M).

First-timers, please follow the steps below:

1. ```cd``` into the **server** folder

2. run ```npm install express cors mongoose dotenv``` 

3. (optional) run ```sudo nmp install -g nodemon``` 
    - Nodemon just makes development easier and will automatically restart the server whenever the files are changed.

4. create a file in the **server** folder called ```config.env``` this is where you'll store your ```ATLAS_URI``` and ```PORT``` number. To get the ```ATLAS_URI``` contact one of the team members. 

To start the server:

1. ```cd``` into the **server** folder

2. run ```node server.js ``` or ```nodemon server.js```

If everything was installed correctly, you should get the following message in your terminal:

  ```Server is running on port: {your port number}```
  
  ```MongoDB database connection established successfully```

----------------------------------------------------------

## Frontend

First-timers, please follow the steps below:

1. ```cd``` into the **feel-good-tunes-react** folder

2. run ```npm install``` 

To start the development server:

1. ```cd``` into the **feel-good-tunes-react** folder

2. run ```npm start ```

If everything was installed correctly, you should get the following message in your terminal:
  
  ```Compiled successfully!```

  ```You can now view feel-good-tunes-react in the browser.```

  ```Local:            http://localhost:3000```

  ```On Your Network:  http://10.0.0.160:3000```

  ```Note that the development build is not optimized.```
  
  ```To create a production build, use npm run build.```

  ```webpack compiled successfully```
  
  ## Frontend Streamlit
  
  1. ```cd``` into the **ML** folder
  2. pip install streamlit opencv-python-headless
  3. streamlit run webCamApp.py

  ## ML dependencies
  
  ### Audio Recognition ML
  1. brew install portaudio
  2. pip install streamlit
  3. pip install SpeechRecognition
  4. pip install PyAudio

  ### Facial Recognition ML
  1. 
  
