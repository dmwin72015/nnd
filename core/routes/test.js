function test(req, res , next){

    var query = req.query;
    if (query.a) {
        res.send('所有test下路径');
    } else {
        next();
    }

}

module.exports = {
    '*': {
        'all': test
    },

    '/:action':{
    	get:function(){

    		
    	}
    }
}
