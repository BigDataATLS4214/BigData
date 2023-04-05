from decouple import config
import pymongo

CLIENT = pymongo.MongoClient(config('ATLAS_URI'))
DB = CLIENT["music_list"]

def main():
    file = open("track_info.txt", "r")
    lines = file.readlines()
    for line in lines:
        temp = line.strip().split("<SEP>")
        # TODO: use spotify api to find the emotion the song belongs to
                # then add them to db and get back resulting id to put into song_title 
        # insert_song(temp[1], temp[0], emotions)
    #TODO: for each emotion, make playlist(s) for them and store the id to the database
    #TODO: add correct tracks to each playlist

# def insert_emotion(emotion):
#     return


def insert_song(song, artist, emotions):
    song_titles_col = DB["songtitles"]
    output = song_titles_col.insert({"title": song, "artist": artist, "emotions": emotions})


if __name__ == "__main__":
    main()