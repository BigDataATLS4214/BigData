import pandas as pd
from sklearn.metrics.pairwise import sigmoid_kernel
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
import random


def fetchDB():
    #connect to mongodb, return df
    pass


def fetchInitRandomPlayist(df):
    '''Returns playlist of 20 random songs from database'''
    return list(df['song_title'][df.song_title.isin(random.sample(list(df.song_title.values), 20))].values)


def getSongTitle():
    #return song title from elasticsearch search
    pass

def updateRecPlaylist(df, feature_cols, recPlaylist, song_title):
    '''Returns 20 song playlist updated with 3 recommended songs added based on searched song title and 3 random songs removed'''
    n = 3
    scaler = MinMaxScaler()
    normalized_df =scaler.fit_transform(df[feature_cols])
    
    indices = pd.Series(df.index, index=df['song_title']).drop_duplicates()
    
    #Cosine similarity and sigmoid kernel matrices based on input matrix
    cosine = cosine_similarity(normalized_df)
    sig_kernel = sigmoid_kernel(normalized_df)

    recSongs = generate_recommendation(df, song_title, n, sig_kernel, indices)

    for song in random.sample(recPlaylist, n):
        recPlaylist.remove(song)
    for song in recSongs:
        recPlaylist.append(song)

    return recPlaylist


def generate_recommendation(df, song_title, n, model_type, indices):
    """Returns top n songs based on similarity score to input song"""
    index=indices[song_title]
    score=list(enumerate(model_type[indices['Parallel Lines']]))
    similarity_score = sorted(score,key = lambda x:x[1],reverse = True)
    similarity_score = similarity_score[1:n]
    top_songs_index = [i[0] for i in similarity_score]
    top_songs=df['song_title'].iloc[top_songs_index]

    return list(top_songs)


def main():
    df = pd.read_csv('/Users/ashwath/Downloads/data.csv', index_col=0)
    feature_cols=['acousticness', 'danceability', 'duration_ms', 'energy',
                  'instrumentalness', 'key', 'liveness', 'loudness', 'mode',
                  'speechiness', 'tempo', 'time_signature', 'valence']

    recPlaylist = fetchInitRandomPlayist(df)
    print(f'\n\n{recPlaylist}\n\n')

    recPlaylist = updateRecPlaylist(df, feature_cols, recPlaylist, 'Parallel Lines')
    print(f'{recPlaylist}\n\n')


main()

# TO DOs
# Limit of 20
# First, random
# Then, based on history - add 3, remove 3 randomly from collection
# Connect to mongodb


# Search functionality - elasticsearch
# Dockerize
# Add tags to data


# Add audio keyword recognition feature