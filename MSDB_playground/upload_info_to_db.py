from decouple import config
import pymongo

CLIENT = pymongo.MongoClient(config('ATLAS_URI'))
DB = CLIENT["music_list"]

def main():
    file = open("MSDB_playground/track_info.txt", "r")
    lines = file.readlines()
    for line in lines:
        temp = line.strip().split("<SEP>")
        # TODO: use spotify api to look up how many songs and albums the artist has
        artist_id = insert_artist(temp[0])
        # TODO: find the genre(s), album(s), and emotion(s) the song belongs to
        insert_song(temp[1], artist_id)
    

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