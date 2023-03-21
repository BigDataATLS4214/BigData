//requiring variables
const express = require("express"); 
const cors = require("cors"); 
const mongoose = require("mongoose");

require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect to databse
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, dbName: "music_list"});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
})

//requiring and using the route files made
const artistRouter = require('./routes/artists');
const emotionRouter = require('./routes/emotions');
const genreRouter = require('./routes/genres');
const albumRouter = require('./routes/albums');
const songTitleRouter = require('./routes/song_titles');

app.use('/artists', artistRouter);
app.use('/emotions', emotionRouter);
app.use('/genres', genreRouter);
app.use('/albums', albumRouter);
app.use('/song_titles', songTitleRouter);

 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});