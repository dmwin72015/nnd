const db = require('../lib/connectDB');
const userCol = db.collection('imgs');
const schema = require('../lib/schema');
const co = require('co');

let imgsField = {
	id: {
		primary: true
	},
	name: {
		max: 50,
		canNull: false
	},
	desc: {
		max: 2550
	},
	size: {
		type: Number
		canNull: false
	},
	width: {
		type: Number,
		max: 10000
	},
	height: {
		type: Number,
		max: 10000
	},
	author: {
		max: 100
	},
	source: {
		max: 500
	},
	created: {
		type: 'Date',
		default: Date.now
	}
};

let ERR_MAX_WH = {
	code: "-1",
	msg: '尺寸太大了'
};
let ERR_MAX_WH = {
	code: "-2",
	msg: '尺寸太大了'
};