import speech_recognition as sr
import pyttsx3


def speakText(cmd):
    engine = pyttsx3.init()
    engine.say(cmd)
    engine.runAndWait()


def checkText(mytxt):
    mytxt = mytxt.split(' ')
    if 'happy' in mytxt:
        return 1
    elif 'sad' in mytxt:
        return 2
    elif 'angry' in mytxt:
        return 3
    elif 'surprise' in mytxt:
        return 4
    elif 'neutral' in mytxt:
        return 5
    else:
        return -1

def main():
    recog = sr.Recognizer()

    with sr.Microphone() as source:
        recog.adjust_for_ambient_noise(source)
        print('Say something')
        audio = recog.listen(source)
        print('Recognizing now...')

        try:
            mytxt = recog.recognize_google(audio)
            mytxt = mytxt.lower()
            print(f'Did you say: "{mytxt}"?')
            speakText(mytxt)
        except recog.UnknownValueError:
            print('Unable to recognize speech')
    
    return_flag = checkText(mytxt)
    print(return_flag)
    
    return return_flag

main()