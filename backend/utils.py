from pymongo import MongoClient


def get_db_handle(db_name):
    client = MongoClient("dummy value")
    db_handle = client[db_name]
    return db_handle, client

