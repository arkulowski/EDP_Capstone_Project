from flask import Flask, jsonify, request, make_response, Response
from flask_cors import CORS
import pandas as pd
import json
import pickle

with open("../models/rfr_model.pkl", "rb") as f:
    loaded_model = pickle.load(f)

app = Flask(__name__)
# Specify the allowed origin
CORS(app)

@app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()

@app.route('/')
def index():
    return "CORS is enabled!"

@app.route('/test', methods=['GET'])
def get_test():
    return jsonify({"response": "good"})


@app.route('/estimate_salary', methods=['POST'])
def estimate_salary():
    features_input = json.loads(request.data)
    features_input["years_of_experience"] = int(features_input["years_of_experience"])
    features_input["education_level"] = int(features_input["education_level"])
    df = pd.DataFrame(features_input, index=[0])

    output = loaded_model.predict(df)[0]
    response = jsonify({"estimated_salary": output})
    print(response)
    # Set the specific origin in the response headers
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5000)
