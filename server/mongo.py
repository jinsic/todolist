import pymongo

class Mongo(object):
  
  def db(collection):
    client = pymongo.MongoClient("localhost", 27017)
    db = client["todo_db"]
    return db[collection]
    
