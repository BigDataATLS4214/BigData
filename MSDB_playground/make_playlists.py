from decouple import config
import pymongo
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import json
import requests
import base64
import requests

CLIENT = pymongo.MongoClient(config('ATLAS_URI'))
DB = CLIENT["music_list"]
EMOTIONS = DB["emotions"]
SONGTITLES = DB["songtitles"]
PLAYLISTS = DB["playlistids"]

cid = config('CLIENT_ID')
secret = config('CLIENT_SECRET')

#USING SPOTIPY TO AUTHENTICATE
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=cid, client_secret=secret, redirect_uri="http://google.com/", scope="playlist-modify-public"))

happy_p = ['5llrJHEv24d1wLtryxskMi', '17aA263QgINkowBPdUrqO2', '4higTFwSlI3cnlWwVBqMIs', '5BP9NEPeOm34FfuHESm2RW']
sad_p = ['2ELABvvL94dw4KKC41TTdj', '6WSDjnasxi971nawln2diC', '41ZjQcJHJi0VQpsLsgo6zn', '07nXY0s3dqfb3f3uY372nx']
angry_p = ['4SWIYii7EaSLQ5nQtOEJo9', '1qEfPeB3fkrtdtXfB6YAOZ', '5Fm1bkecmfSXo9cS8gpIjS', '1EcP0On1OUxlEuE1iROiOB']
surprised_p = ['49AHqBEFDAUWkoIaEyaoUH', '3LbkQiuSd0QEzLJAs3qCFv', '1T3FNDKEHXAotobp52soRN', '4sqLTQ9ZknAtAQFw708AVd']
neutral_p = ['43vOrIXflmdDvA4JbIHCdW', '6GbX2FpsqMDsCQAWdVCHwY', '5Hw0XPzC363uGjouMxy5mN', '026ZmfyMj2vAbXiefswhYZ']


def make_playlists_happy():

    #PLAYLISTS FOR HAPPY
    # Send the playlist creation request and get the response
    Happy1 = sp.user_playlist_create("laurenkeychenko", "Happy1", public=True, collaborative=False, description='')
    playlistID = Happy1.get("id")
    happy_p.append(playlistID)

    Happy2 = sp.user_playlist_create("laurenkeychenko", "Happy2", public=True, collaborative=False, description='')
    playlistID = Happy2.get("id")
    happy_p.append(playlistID)

    Happy3 = sp.user_playlist_create("laurenkeychenko", "Happy3", public=True, collaborative=False, description='')
    playlistID = Happy3.get("id")
    happy_p.append(playlistID)

    Happy4 = sp.user_playlist_create("laurenkeychenko", "Happy4", public=True, collaborative=False, description='')
    playlistID = Happy4.get("id")
    happy_p.append(playlistID)

def make_playlists_sad():

    #PLAYLISTS FOR HAPPY
    # Send the playlist creation request and get the response
    sad1 = sp.user_playlist_create("laurenkeychenko", "Sad1", public=True, collaborative=False, description='')
    playlistID = sad1.get("id")
    sad_p.append(playlistID)

    sad2 = sp.user_playlist_create("laurenkeychenko", "Sad2", public=True, collaborative=False, description='')
    playlistID = sad2.get("id")
    sad_p.append(playlistID)

    sad3 = sp.user_playlist_create("laurenkeychenko", "Sad3", public=True, collaborative=False, description='')
    playlistID = sad3.get("id")
    sad_p.append(playlistID)

    sad4 = sp.user_playlist_create("laurenkeychenko", "Sad4", public=True, collaborative=False, description='')
    playlistID = sad4.get("id")
    sad_p.append(playlistID)

def make_playlists_angry():

    #PLAYLISTS FOR HAPPY
    # Send the playlist creation request and get the response
    one = sp.user_playlist_create("laurenkeychenko", "Angry1", public=True, collaborative=False, description='')
    playlistID = one.get("id")
    angry_p.append(playlistID)

    two = sp.user_playlist_create("laurenkeychenko", "Angry2", public=True, collaborative=False, description='')
    playlistID = two.get("id")
    angry_p.append(playlistID)

    three = sp.user_playlist_create("laurenkeychenko", "Angry3", public=True, collaborative=False, description='')
    playlistID = three.get("id")
    angry_p.append(playlistID)

    four = sp.user_playlist_create("laurenkeychenko", "Angry4", public=True, collaborative=False, description='')
    playlistID = four.get("id")
    angry_p.append(playlistID)

def make_playlists_surprised():

    #PLAYLISTS FOR HAPPY
    # Send the playlist creation request and get the response
    one = sp.user_playlist_create("laurenkeychenko", "Surprised1", public=True, collaborative=False, description='')
    playlistID = one.get("id")
    surprised_p.append(playlistID)

    two = sp.user_playlist_create("laurenkeychenko", "Surprised2", public=True, collaborative=False, description='')
    playlistID = two.get("id")
    surprised_p.append(playlistID)

    three = sp.user_playlist_create("laurenkeychenko", "Surprised3", public=True, collaborative=False, description='')
    playlistID = three.get("id")
    surprised_p.append(playlistID)

    four = sp.user_playlist_create("laurenkeychenko", "Surprised4", public=True, collaborative=False, description='')
    playlistID = four.get("id")
    surprised_p.append(playlistID)

def make_playlists_neutral():

    #PLAYLISTS FOR HAPPY
    # Send the playlist creation request and get the response
    one = sp.user_playlist_create("laurenkeychenko", "Neutral1", public=True, collaborative=False, description='')
    playlistID = one.get("id")
    neutral_p.append(playlistID)

    two = sp.user_playlist_create("laurenkeychenko", "Neutral2", public=True, collaborative=False, description='')
    playlistID = two.get("id")
    neutral_p.append(playlistID)

    three = sp.user_playlist_create("laurenkeychenko", "Neutral3", public=True, collaborative=False, description='')
    playlistID = three.get("id")
    neutral_p.append(playlistID)

    four = sp.user_playlist_create("laurenkeychenko", "Neutral4", public=True, collaborative=False, description='')
    playlistID = four.get("id")
    neutral_p.append(playlistID)

def add_to_happy():

    #get all happy songs
    happy_id = list(EMOTIONS.find({"name": "happy"}, {"id": 1}))[0]["_id"] #gets the happy object id from collection
    all_happy_songs = list(SONGTITLES.find({"emotions": happy_id})) # gives all songs that are happy

    numSongs = all_happy_songs.len() #total # of items in list
    counter = 0
    currentPlaylistId = happy_p[0]
    
    #for all happy songs
    for song in all_happy_songs:
        print("in loop")
        #if int(numSongs/4) <= counter
        if int(numSongs/4) <= counter:
            currentPlaylist = playlists[playlists.index(currentPlaylist) + 1]
            counter = 0
        #store the song in currentPlaylist
        trackURL = "spotify:track:"+all_happy_songs[song]
        sp.playlist_add_items(currentPlaylistId, items, position=None) # need track URI for item
        counter = counter + 1


if __name__ == "__main__":
    add_to_happy()
    #make_playlists_happy()
    #make_playlists_sad()
    #make_playlists_angry()
    #make_playlists_surprised()
    #make_playlists_neutral()