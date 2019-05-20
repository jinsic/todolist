from flask import Blueprint, jsonify, request
from mongo import Mongo

todo= Blueprint('todo', __name__)
users = Mongo.db("user")

@todo.route("/new", methods=["POST"])
def new():
  json = request.json
  email = json["email"]
  todo_id = json["id"]
  todo = json["todo"]
  description = json["description"]
  due_date = json["due_date"]
  due_time = json["due_time"]
  left = json["left"]
  top = json["top"]
  z_index = json["z_index"]

  users.update(
    { "email": email },
    {
      "$pull": {
        "todos": {
          "todo_id": todo_id
        }
      }
    })
  result = users.update(
    { "email": email },
    { 
      "$push" : {
        "todos": {
          "todo_id": todo_id,
          "todo": todo,
          "description": description,
          "due_date": due_date,
          "due_time": due_time,
          "left": left,
          "top": top,
          "z_index": z_index,
          "done": 0
        }
      }
    })
  return jsonify(result=result)

@todo.route("/get", methods=["POST"])
def get():
  json = request.json
  email = json["email"]
  results = users.find({ "email": email }, { "todos": 1, "_id": 0 })
  return jsonify(todos=results[0]["todos"])

@todo.route("/delete", methods=["POST"])
def delete():
  json = request.json
  email = json["email"]
  todo_id = json["todo_id"]
  result = users.update(
    { "email": email },
    {
      "$pull": {
        "todos": {
          "todo_id": todo_id
        }
      }
    })
  return jsonify(result=result)

@todo.route("/done", methods=["POST"])
def done():
  json = request.json
  email = json["email"]
  todo_id = json["todo_id"]
  result = users.update(
    { "email": email, "todos.todo_id": todo_id },
    {
      "$set": {
        "todos.$.done": 1
      }
    })
  print(result)
  return jsonify(result=result)

@todo.route("/set-todo", methods=["POST"])
def set_todo():
  json = request.json
  email = json["email"]
  todo_id = json["todo_id"]
  left = json["left"]
  top = json["top"]
  z_index = json["z_index"]
  result = users.update(
    { "email": email, "todos.todo_id": todo_id },
    {
      "$set": {
        "todos.$.done": 0,
        "todos.$.left": left,
        "todos.$.top": top,
        "todos.$.z_index": z_index
      }
    })
  print(result)
  return jsonify(result=result)





