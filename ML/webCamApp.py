import streamlit as st
import cv2

def main():
    st.title("Webcam Test")
    run = st.checkbox('Run')
    video_feed = st.empty()
    
    if run:
        cap = cv2.VideoCapture(0)
        while run:
            ret, frame = cap.read()
            if not ret:
                st.error("Failed to capture frame from camera.")
                break
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            video_feed.image(frame)
        cap.release()

if __name__ == '__main__':
    main()