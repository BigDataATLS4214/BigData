from decouple import config
import pymongo
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json


#LOGGING INTO SPOTIFY USING SPOTIPY
#def spotify_login(cid, secret):
    #client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret) 
    #eturn spotipy.Spotify(client_credentials_manager=client_credentials_manager)

cid = config('CLIENT_ID')
secret = config('CLIENT_SECRET')

#USING SPOTIPY TO AUTHENTICATE
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

#AYTHENTICATION OF ATLAS URI
CLIENT = pymongo.MongoClient(config('ATLAS_URI'))
DB = CLIENT["music_list"]
EMOTIONS = DB["emotions"]
SONGTITLES = DB["songtitles"]

def main():
    # SONGTITLES.drop()
    file = open("track_info.txt", "r")
    lines = file.readlines()
    all_song_docs = []
    for line in lines:
        temp = line.strip().split("<SEP>")
        song_doc = make_song_doc(temp[1])
        if song_doc:
            all_song_docs.append(song_doc)
    SONGTITLES.insert_many(all_song_docs)

def make_song_doc(song):
    print(song)
    try:
         #SEARCHING FOR SONG BASED OFF OF ITS NAME
        trackFile = sp.search(song, type="track", limit=1)

        #CREATING A DICTIONARY OUT OF THAT TRACKS ITEMS
        trackDict = trackFile.get("tracks").get("items")
    
        #RETRIEVING THAT TRACKS SONG ID
        songId = trackDict[0]["id"]

        #RETRIEVING THAT TRACKS AUDIO FEATURES USING ITS SONG ID
        songFeatures = sp.audio_features(songId) 

        #EXTRACT ALL NEEDED DATA FROM SONG TO MAKE A CHOICE
        valence = songFeatures[0]["valence"]
        danceability = songFeatures[0]["danceability"]
        energy = songFeatures[0]["energy"]
        instrumentalness = songFeatures[0]["instrumentalness"]
    except:
        return {}
    
    emotions = []
    #GUIDE FOR CHOOSING A SONG MOOD
    if valence > 0.75:
        #add happy tag to song
        output = list(EMOTIONS.find({"name": "happy"}, {"_id": 1}))
        emotions.append(output[0]["_id"])
    if valence < 0.75:
        output = list(EMOTIONS.find({"name": "sad"}, {"_id": 1}))
        emotions.append(output[0]["_id"])
    if energy > 0.7:
        output = list(EMOTIONS.find({"name": "angry"}, {"_id": 1}))
        emotions.append(output[0]["_id"])
    if valence > 0.6 and energy > 0.5:
        output = list(EMOTIONS.find({"name": "surprised"}, {"_id": 1}))
        emotions.append(output[0]["_id"])
    if valence > 0.4 and valence < 0.7 and instrumentalness > 0.7:
        output = list(EMOTIONS.find({"name": "neutral"}, {"_id": 1}))
        emotions.append(output[0]["_id"])
    
    return {"spotify_id": songId, "emotions": emotions}

if __name__ == "__main__":
    main()