/**
 * Created by mjj on 2017/7/24.
 */
const db = require('../lib/connectDB');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


function factory(collectionName, schemaField) {

    let schema = new Schema(schemaField);

    let model = db.model(collectionName, schema);

    return model;

}

module.exports = exports = factory;

exports.Schema = Schema;