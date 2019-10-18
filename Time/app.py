from flask import Flask, render_template, request
import webbrowser
import time

app = Flask(__name__)



@app.route("/")
def home():
    return render_template('RLEAPP.html')

@app.route("/display_input")
def display_input():
    return render_template('open_file.html')

@app.route('/display_input', methods=['POST'])
def displau_inputter():
    text = request.form['text']
    try:
        text = open(text, 'r')
    except FileNotFoundError:
        return render_template('error.html', msg = 'File Does Not Exist')
    text = text.read()
    text = text.replace('\n','<br>')
    return text + '<a href="/" class="button">Done</a>'

@app.route("/enter_rle")
def enter_rle():
    return render_template('text_area.html')

@app.route('/enter_rle', methods=['POST'])
def rle_post():
    text = request.form['text']
    text = text.replace('\n','<br>') + '<br>'
    #function to save/whatever
    return text + '<a href="/" class="button">Done</a>'



if __name__ == "__main__":
    app.run(debug=True)
