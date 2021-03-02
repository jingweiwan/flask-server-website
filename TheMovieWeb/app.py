
from flask import Flask, request
from flask_cors import CORS
import json
import requests
app = Flask(__name__, static_url_path = '/static')
CORS(app)
api_key = "" #Paste your API key here
@app.route("/", methods = ["GET","POST"])
def index():

    return app.send_static_file("index.html")

@app.route("/trend", methods = ["GET"])
def get_TrendingMovie_data():
    if request.method=="GET":
        media_type = "movie"
        time = "week"
        req = requests.get("https://api.themoviedb.org/3/trending/" + media_type + "/" + time + "?api_key="+api_key)
        return req.json()


@app.route("/airtv", methods = ["GET"])
def get_AirTV_data():
    if request.method=="GET":
        media_type = "tv"
        req = requests.get("https://api.themoviedb.org/3/"+media_type+"/airing_today/?api_key="+api_key)
        return req.json()

@app.route("/genre/<media>", methods = ["GET"])
def get_genre_data(media):
    if request.method=="GET":
        req = requests.get("https://api.themoviedb.org/3/genre/"+media+"/list?api_key="+api_key+"&language=en-US")
        return req.json()

@app.route("/search/<keyword>&<category>", methods= ["GET"])
def get_Search_data(keyword,category):
    if request.method=="GET":
        media_type = "movie"
        keyword=keyword.replace(' ',"%20")
        category=category.replace(' ',"%20")

        if category == "Movies":
            media_type = "movie"
        elif category == "TV%20Shows":
            media_type = "tv"
        elif category == "Movies%20and%20TV%20Shows":
            media_type = "multi"
        req = requests.get("https://api.themoviedb.org/3/search/"+media_type+"?api_key="+api_key+"&query="+keyword+"&language=en-US&page=1&include_adult=false")
        json_data = json.loads(req.text)
        if media_type == "multi":
            for i in json_data["results"][:]:
                if i["media_type"] == "person":
                    json_data["results"].remove(i)
        return json_data

@app.route("/detail/<media>&<id>", methods = ["GET"])
def get_detail_data(media,id):
    if request.method=="GET":
        req = requests.get("https://api.themoviedb.org/3/"+media+"/"+id+"?api_key="+api_key+"&language=en-US")
        return req.json()

@app.route("/actor/<media>&<id>", methods = ["GET"])
def get_actor_data(media,id):
    if request.method=="GET":
        req = requests.get("https://api.themoviedb.org/3/"+media+"/"+id+"/credits?api_key="+api_key+"&language=en-US")
        return req.json()

@app.route("/review/<media>&<id>", methods = ["GET"])
def get_review_data(media,id):
    if request.method=="GET":
        req = requests.get("https://api.themoviedb.org/3/"+media+"/"+id+"/reviews?api_key="+api_key+"&language=en-US&page=1")
        return req.json()

if __name__ == "__main__":
    app.run(debug= True)
