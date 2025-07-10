import json
import pickle
from flask import Flask, jsonify, request
import pandas as pd

lin_reg_model = None
model_path = "../models/lin_reg_model.pkl"
with open(model_path, "rb") as f:
    lin_reg_model = pickle.load(f)

app = Flask(__name__)


@app.route('/test', methods=['GET'])
def get_test():
    return jsonify({"response":"good"})

@app.route('/estimate_salary', methods=['POST'])
def estimate_salary():
    features_input = json.loads(request.data)
    features_input["years_of_experience"]=int(features_input["years_of_experience"])
    features_input["education_level"]=int(features_input["education_level"])
    df = pd.DataFrame(features_input, index=[0])

    output = lin_reg_model.predict(df)[0]
    return jsonify({"estimated_salary":output})
    #return jsonify(features)

if __name__ == '__main__':
    app.run(debug=True, port=5000)