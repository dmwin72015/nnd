function Schema(obj, options) {
	if (!(this instanceof Schema)) {
		return new Schema(obj, options);
	}
	this.obj = obj;
	this.paths = {};
	this._requiredPath = {};
	this.options = this.defaultOption(options);
}

// 把ID转字符串
function idGetter() {
	if (this._id != null) {
		return String(this._id);
	}

	return null;
}

// 继承自EventEmitter(事件对象)
Schema.prototype = Object.create(EventEmitter.prototype);
Schema.prototype.constructor = Schema;
Schema.prototype.instanceOfSchema = true;

Schema.prototype.defaultOptions = function(options) {
	if (options && options.safe === false) {
		options.safe = {
			w: 0
		};
	}

	if (options && options.safe && options.safe.w === 0) {
		// if you turn off safe writes, then versioning goes off as well
		options.versionKey = false;
	}

	options = utils.options({
		strict: true,
		bufferCommands: true,
		capped: false, // { size, max, autoIndexId }
		versionKey: '__v',
		discriminatorKey: '__t',
		minimize: true,
		autoIndex: null,
		shardKey: null,
		read: null,
		validateBeforeSave: true,
		// the following are only applied at construction time
		noId: false, // deprecated, use { _id: false }
		_id: true,
		noVirtualId: false, // deprecated, use { id: false }
		id: true,
		typeKey: 'type',
		retainKeyOrder: false
	}, options);

	if (options.read) {
		options.read = readPref(options.read);
	}

	return options;
};

// 获取必须字段
Schema.prototype.requiredPaths = function(isCache) {
	if (this._requiredPath && !isCache) {
		return this._requiredpaths;
	}
	var paths = Object.keys(this.paths),
		i = paths.length,
		ret = [];

	while (i--) {
		var path = paths[i];
		if (this.paths[path].isRequired) {
			ret.push(path);
		}
	}
	this._requiredpaths = ret;
	return this._requiredpaths;
}


Schema.prototype.createMod = function(collection){



}