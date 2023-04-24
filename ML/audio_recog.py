import streamlit as st
import speech_recognition as sr
from PIL import Image
import os


def get_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source)
        if audio:
            try:
                txt = r.recognize_google(audio)
                return txt
            except:
                st.write('Audio not recognized. Try again!')
        else:
            st.write('Audio not recognized. Try again!')


def checkText(mytxt):
    mytxt = mytxt.split(' ')
    if 'happy' in mytxt:
        return 1, 'happy'
    elif 'sad' in mytxt:
        return 2, 'sad'
    elif 'angry' in mytxt:
        return 3, 'angry'
    elif 'surprise' in mytxt:
        return 4, 'surprise'
    elif 'neutral' in mytxt:
        return 5, 'neutral'
    else:
        return -1, ''

def main():
    img = Image.open('microphone-solid.png')
    st.image(img, width=75)

    if st.button('Click to record audio'):
        txt = get_audio()
        print(txt)
        if txt:
            return_flag, genre = checkText(txt)
            print(return_flag)

            if return_flag != -1:
                st.write("Recommending ", genre, " songs")
            else:
                st.write('Choose an available genre!')

            return return_flag

main()