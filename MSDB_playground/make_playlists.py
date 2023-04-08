from decouple import config
import pymongo

CLIENT = pymongo.MongoClient(config('ATLAS_URI'))
DB = CLIENT["music_list"]
EMOTIONS = DB["emotions"]
SONGTITLES = DB["songtitles"]
PLAYLISTS = DB["playlistids"]

def make_playlists():
    #playlists = make 4 playlists for each emotion (list)
    #store the playlist ids into the database (need name of playlist and the spotify id)

    #get all songs with certain emotion
    #numSongs = # of songs
    #counter = 0
    #currentPlaylist = playlists[0]
    
    #for all songs with emotion
        #if int(numSongs/4) <= counter
            #currentPlaylist = playlists[playlists.index(currentPlaylist) + 1]
            #counter = 0
        #store the song in currentPlaylist
        #counter++

    return

if __name__ == "__main__":
    make_playlists()