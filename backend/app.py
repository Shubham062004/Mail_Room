from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from datetime import datetime
import os
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# MongoDB Configuration
app.config['MONGO_URI'] = 'mongodb+srv://snehagarg:sneha123@cluster0.xbgqtbs.mongodb.net/myDatabase?retryWrites=true&w=majority'
mongo = PyMongo(app)
db = mongo.db  # Reference to the database

@app.route('/')
def home():
    return "Welcome to Flask with MongoDB!"

# Helper functions
def parse_date(date_str):
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        return None

# Routes for Vendors
@app.route('/api/vendors', methods=['GET'])
def get_vendors():
    vendors = db.vendors.find()
    return jsonify([{
        'id': str(vendor['_id']),
        'name': vendor['name'],
        'websiteUrl': vendor['website_url'],
        'email': vendor['email'],
        'phone': vendor['phone'],
        'spocPerson': vendor['spoc_person'],
        'agreementStart': vendor['agreement_start'],
        'agreementEnd': vendor['agreement_end'],
        'addressLine1': vendor['address_line1'],
        'addressLine2': vendor['address_line2'],
        'city': vendor['city'],
        'state': vendor['state'],
        'pinCode': vendor['pin_code'],
        'nutritionInfo': vendor['nutrition_info'],
        'calories': vendor['calories'],
        'protein': vendor['protein'],
        'packagingType': vendor['packaging_type'],
        'dimensions': vendor['dimensions'],
        'weight': vendor['weight']
    } for vendor in vendors])

@app.route('/api/vendors/<string:id>', methods=['GET'])
def get_vendor(id):
    vendor = db.vendors.find_one_or_404({'_id': id})
    return jsonify({
        'id': str(vendor['_id']),
        'name': vendor['name'],
        'websiteUrl': vendor['website_url'],
        'email': vendor['email'],
        'phone': vendor['phone'],
        'spocPerson': vendor['spoc_person'],
        'agreementStart': vendor['agreement_start'],
        'agreementEnd': vendor['agreement_end'],
        'addressLine1': vendor['address_line1'],
        'addressLine2': vendor['address_line2'],
        'city': vendor['city'],
        'state': vendor['state'],
        'pinCode': vendor['pin_code'],
        'nutritionInfo': vendor['nutrition_info'],
        'calories': vendor['calories'],
        'protein': vendor['protein'],
        'packagingType': vendor['packaging_type'],
        'dimensions': vendor['dimensions'],
        'weight': vendor['weight']
    })

@app.route('/api/vendors', methods=['POST'])
def create_vendor():
    data = request.json
    vendor = {
        'name': data.get('name'),
        'website_url': data.get('websiteUrl'),
        'email': data.get('email'),
        'phone': data.get('phone'),
        'spoc_person': data.get('spocPerson'),
        'agreement_start': data.get('agreementStart'),
        'agreement_end': data.get('agreementEnd'),
        'address_line1': data.get('addressLine1'),
        'address_line2': data.get('addressLine2'),
        'city': data.get('city'),
        'state': data.get('state'),
        'pin_code': data.get('pinCode'),
        'nutrition_info': data.get('nutritionInfo'),
        'calories': data.get('calories'),
        'protein': data.get('protein'),
        'packaging_type': data.get('packagingType'),
        'dimensions': data.get('dimensions'),
        'weight': data.get('weight')
    }
    result = db.vendors.insert_one(vendor)
    vendor['id'] = str(result.inserted_id)
    return jsonify(vendor), 201

@app.route('/api/vendors/<string:id>', methods=['PUT'])
def update_vendor(id):
    data = request.json
    db.vendors.update_one({'_id': id}, {'$set': {
        'name': data.get('name'),
        'website_url': data.get('websiteUrl'),
        'email': data.get('email'),
        'phone': data.get('phone'),
        'spoc_person': data.get('spocPerson'),
        'agreement_start': data.get('agreementStart'),
        'agreement_end': data.get('agreementEnd'),
        'address_line1': data.get('addressLine1'),
        'address_line2': data.get('addressLine2'),
        'city': data.get('city'),
        'state': data.get('state'),
        'pin_code': data.get('pinCode'),
        'nutrition_info': data.get('nutritionInfo'),
        'calories': data.get('calories'),
        'protein': data.get('protein'),
        'packaging_type': data.get('packagingType'),
        'dimensions': data.get('dimensions'),
        'weight': data.get('weight')
    }})
    updated_vendor = db.vendors.find_one({'_id': id})
    return jsonify({
        'id': str(updated_vendor['_id']),
        'name': updated_vendor['name'],
        'websiteUrl': updated_vendor['website_url'],
        'email': updated_vendor['email'],
        'phone': updated_vendor['phone'],
        'spocPerson': updated_vendor['spoc_person'],
        'agreementStart': updated_vendor['agreement_start'],
        'agreementEnd': updated_vendor['agreement_end'],
        'addressLine1': updated_vendor['address_line1'],
        'addressLine2': updated_vendor['address_line2'],
        'city': updated_vendor['city'],
        'state': updated_vendor['state'],
        'pinCode': updated_vendor['pin_code'],
        'nutritionInfo': updated_vendor['nutrition_info'],
        'calories': updated_vendor['calories'],
        'protein': updated_vendor['protein'],
        'packagingType': updated_vendor['packaging_type'],
        'dimensions': updated_vendor['dimensions'],
        'weight': updated_vendor['weight']
    })

@app.route('/api/vendors/<string:id>', methods=['DELETE'])
def delete_vendor(id):
    db.vendors.delete_one({'_id': id})
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)