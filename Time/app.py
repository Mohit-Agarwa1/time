from flask import Flask, render_template, request
import os
import webbrowser
import time

from threading import Thread


def escape_message():
    return render_template('error.html', msg='Please close the browser')


def exit_application():
    time.sleep(3)
    os._exit(0)
    quit()


# app name
# used to create app, called later
app = Flask(__name__)


# handling error, if page is not found, error not spat at user
@app.errorhandler(404)
def not_found(e):
    return render_template("error.html", msg='Page does not Exist')


@app.errorhandler(500)
def not_found(e):
    return render_template("error.html", msg='An internal error has occurred')


@app.route("/")
def home():
    return render_template('RLEAPP.html')


@app.route("/display_input")
def display_input():
    return render_template('open_file.html')


@app.route('/display_input', methods=['POST'])
def display_inputter():
    text = request.form['text']
    if text == 'nevergonnagiveyouup':
        return '<meta http-equiv="Refresh" content="5; url=https://www.youtube.com/watch?v=dQw4w9WgXcQ" />'
    try:
        text = open(text, 'r')
    except FileNotFoundError:
        return render_template('error.html', msg='File Does Not Exist')
    text = text.read().replace('\n', '<br>') + '<br>'
    

    return render_template('display.html', text=text)


@app.route("/enter_rle")
def enter_rle():
    return render_template('text_area.html')


@app.route('/enter_rle', methods=['POST'])
def rle_post():
    text = request.form['text']
    print(text)
    return render_template('display.html', text=text)


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/close')
def close_web():
    Thread(target=escape_message).start()
    Thread(target=exit_application).start()

    return render_template('close.html', msg='Please close the browser')


if __name__ == "__main__":
    webbrowser.open('http://127.0.0.1:5000')
    app.run(debug=False, host='127.0.0.1')
