const EventEmitter = require('events');
const err = require('./error');
const SchemaType = require('./schemaType');

function Schema(obj, options) {
    if (!(this instanceof Schema)) {
        return new Schema(obj, options);
    }
    this.paths = obj || {};
    this._requiredpaths = null;
    this.options = this.defaultOptions(options);
    this.collections = null;
    this.validators = [];
    this.initRequiredPaths();
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

Schema.prototype.defaultOptions = function (options) {
    if (options && options.safe === false) {
        options.safe = {
            w: 0
        };
    }

    if (options && options.safe && options.safe.w === 0) {
        // if you turn off safe writes, then versioning goes off as well
        options.versionKey = false;
    }

    options = Object.assign({
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

    //TODO :read是啥意思
    if (options.read) {
        options.read = readPref(options.read);
    }

    return options;
};

// 获取必须字段
Schema.prototype.initRequiredPaths = function (isCache) {
    if (this._requiredpaths && !isCache) {
        return this._requiredpaths;
    }
    var paths = Object.keys(this.paths),
        i = paths.length,
        ret = [];

    while (i--) {
        var path = paths[i];
        if (this.paths[path].required) {
            ret.push(path);
        }
    }
    this._requiredpaths = ret;
    return this._requiredpaths;
};

Schema.prototype.validate = function (data, callback) {

    data = data || data;
    var _this = this;
    var reqPaths = this._requiredpaths;
    var keys = Object.keys(this.paths);

    //验证必须字段
    for (var i = 0; i < reqPaths.length; i++) {
        if (!data[reqPaths[i]]) {
            callback(err.requireErr(reqPaths[i]));
            return;
        }
    }

    //验证数据合法性
    var saType = new SchemaType(this, data);

    if (saType.validation.length) {
        callback(saType.validation);
        saType = null;
        return
    }

    callback(null, saType.result);
    saType = null;
};
Schema.prototype.clearResult = function (){
    this.validators.length = 0;
};
module.exports = exports = Schema;