from flask import Blueprint, jsonify, request
from mongo import Mongo

user = Blueprint('user', __name__)
users = Mongo.db("user")


@user.route("/new", methods=["POST"])
def new():
  json = request.json
  name = json["name"]
  email = json["email"]
  password = json["password"]
  result = users.update(
    { "email": email },
    {
      "$setOnInsert": { 
        "name": name, 
        "email": email,
        "password": password
      }
    },
    upsert=True
  )
  if "upserted" in result:
    return jsonify(result="success")
  else:
    return jsonify(result="failed")

@user.route("/exists", methods=["POST"])
def exists():
  json = request.json
  email = json["email"]
  password = json["password"]
  user = users.find_one(
    { 
      "email": email,
      "password": password
    }
  )
  if user:
    return jsonify(result="success", result_code=1)
  else:
    return jsonify(result="failed", result_code=0)
  
