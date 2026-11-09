from enum import unique
import os
from pymongo import MongoClient 
from dotenv import load_dotenv

load_dotenv()

class MongoDatabase:
  def __init__(self):
    mongo_url = os.getenv('MONGODB_URI')
    database = os.getenv('MONGODB_DATABASE')

    self.mongo_client = MongoClient(mongo_url)
    self.db = self.mongo_client(database)
    self.scrapped_jobs = self.db['scrapped_jobs']
    self.scrapped_jobs.create_index(
      [
        ("source", 1),
        ("sourceJobId", 1)
      ],
      unique=True
    )

  def save_job(self, data):
    return self.scrapped_jobs.update_one({
      "source": data["source"],
      "sourceJobId": data["sourceJobId"]
      },
      {
        "$set": data     ,
      },
      upsert=True 
    )

  def close(self):
    self.mongo_client.close()