'''
Simple REST API using Bottle.py and MongoDB
'''

import json
from bottle import route, run, request, abort, hook, response
from pymongo import MongoClient
from bson import ObjectId

CONNECTION = MongoClient('localhost', 27017)
DB = CONNECTION['todos']

# Custom JSON Encoder to turn MongoDB's ObjectId into a string
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors

@route('/todos', method='POST')
@enable_cors
def post_todo():
    ''' POST Request '''
    if not request.body.readline():
        abort(400, 'No data received')

    entity = json.load(request.body)
    try:
        inserted = DB['todos'].insert(entity)
        print entity
    except BaseException as _ve:
        abort(400, str(_ve))

@route('/todos', method='GET')
@enable_cors
def get_todo():
    ''' GET Request '''
    response.content_type = 'application/json'

    entity = DB['todos'].find()
    entries = [entry for entry in entity]
    if not entity:
        abort(404, 'No document with id %s' % _id)
    return JSONEncoder().encode(entries)

@route('/todos/:_id', method=['OPTIONS', 'DELETE'])
@enable_cors
def delete_todo(_id):
    ''' DELETE Request '''

    entity = DB['todos'].delete_one({'_id':ObjectId(_id)})
    if not entity:
        abort(404, 'No document with id %s' % _id)

    return_entity = {"Deleted Count": entity.deleted_count}
    return JSONEncoder().encode(return_entity)

run(host='localhost', port=8081)
