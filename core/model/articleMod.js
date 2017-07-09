const db = require('../lib/connectDB');
const schema = require('../lib/schema');
const co = require('co');

let userCol = db.collection('article');
let articleField = {
	id: { //ID 唯一标识
		type: String,
		unique: true
	},
	title: { //标题
		type: String,
		length: 200,
		required: true
	},
	subTitle: { //子标题
		type: String,
		length: 200,
		required: false
	},
	author: { //作者
		type: '_id',
		required: false
	},
	editor: {
		type: '_id',
		required: true
	},
	createdDate: { //创建日期
		type: Date,
		default: Date.now
	},
	publishDate: { //发布日期
		type: Date
	},
	htmlContent: { //内容 html
		type: String
	},
	textContent: { //内容 纯文本
		type: String
	},
	source: { //来源
		type: String,
		length: 200
	}
};