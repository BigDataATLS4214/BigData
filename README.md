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

#### Plans for Front-end:
React
Prototyping in Figma
