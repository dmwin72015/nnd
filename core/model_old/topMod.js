const db = require('../lib/connectDB');
const schema = require('../lib/schema');
const co = require('co');


let topListCol = db.collection('topList');
// 保存top 文章和作者
// ['_id','_id',_id]
let topField = {
	totArticle: {
		type: Array
	},
	topAuthor: {
		type: Array
	}
};