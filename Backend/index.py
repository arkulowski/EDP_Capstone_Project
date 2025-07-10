import json
import pickle
from flask import Flask, jsonify, request



app = Flask(__name__)


@app.route('/test', methods=['GET'])
def get_employees():
    return jsonify({"response":"good"})

@app.route('/test', methods=['POST'])
def create_employee():
    data = json.loads(request.data)
    return jsonify(data)