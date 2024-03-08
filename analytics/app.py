from flask import Flask
import SentimentAnalysis as SA
import RecommendationEngine as RE

app = Flask(__name__)

@app.route("/")
def home():
    return "This is the analytics service for FeastFinder!"

@app.route("/recommendations/<food>")
def recommend(food):
    return "If you liked " + str(food) + " you would like this: "

@app.route("/sentiment/<txt>")
def keywords(txt):
    return "People are saying this food is : " + str(SA.keywords(txt))
