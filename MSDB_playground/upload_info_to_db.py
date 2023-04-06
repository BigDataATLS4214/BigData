from decouple import config
import pymongo
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json


#LOGGING INTO SPOTIFY USING SPOTIPY
#def spotify_login(cid, secret):
    #client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret) 
    #eturn spotipy.Spotify(client_credentials_manager=client_credentials_manager)

#I SHOULD PROBABLY HIDE THESE
cid = "5d3513e3cd004a6ea6d5fd243247275c"
secret = "540ce35cc89349948dbb8303d7647e29"

#USING SPOTIPY TO AUTHENTICATE
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

#AYTHENTICATION OF ATLAS URI
CLIENT = pymongo.MongoClient(config('ATLAS_URI'))
DB = CLIENT["music_list"]

####################################################################
#     AN EXAMPLE OF HOW TO TAKE A SONG NAME AND ASSIGN IT A MOOD   #
####################################################################

#SEARCHING FOR SONG BASED OFF OF ITS NAME
songName = 'happy'
trackFile = sp.search(songName, type="track", limit=1)

#CREATING A DICTIONARY OUT OF THAT TRACKS ITEMS
trackDict = trackFile.get("tracks").get("items")

#RETRIEVING THAT TRACKS SONG ID
songId = trackDict[0]["id"]

#RETRIEVING THAT TRACKS AUDIO FEATURES USING ITS SONG ID
songFeatures = sp.audio_features(songId)
print(songFeatures)

#EXTRACT ALL NEEDED DATA FROM SONG TO MAKE A CHOICE
valence = songFeatures[0]["valence"]
danceability = songFeatures[0]["danceability"]
energy = songFeatures[0]["energy"]
instrumentalness = songFeatures[0]["instrumentalness"]


#GUIDE FOR CHOOSING A SONG MOOD
if valence > 0.75:
    print("HAPPY!")
if valence < 0.75:
    print("SAD :(")
if energy > 0.7:
    print("ANGRY!")
if valence > 0.6 and energy > 0.5:
    print("SURPRISED!")
if valence > 0.4 and valence < 0.7 and instrumentalness > 0.7:
    print("NEUTRAL")









def main():
    file = open("track_info.txt", "r")
    lines = file.readlines()
    for line in lines:
        temp = line.strip().split("<SEP>")
        #artist_id = insert_artist(temp[0])
        # TODO: use spotify api to find the genre(s), album(s), and emotion(s) the song belongs to
                # then add them to db and get back resulting id to put into song_title 
        #insert_song(temp[1], artist_id)
    

# def insert_genre(genre):
#     return 

# def insert_album(album):
#     return

# def insert_emotion(emotion):
#     return

def insert_artist(artist):
    artists_col = DB["artists"]
    output = artists_col.insert({"name": artist, "number_of_songs": 0, "number_of_albums": 0})
    return output.inserted_ids

def insert_song(song, artist_id):
    song_titles_col = DB["song_titles"]
    output = song_titles_col.insert({"title": song, "artists": [artist_id], 
                                     "genres": [], "albums": [], "emotions": []})


if __name__ == "__main__":
    main()