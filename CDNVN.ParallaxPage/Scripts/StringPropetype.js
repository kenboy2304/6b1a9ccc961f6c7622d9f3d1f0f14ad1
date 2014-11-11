
String.prototype.JqueryId = function () {
    return (this == "" || this[0] == '#') ? String(this) : String("#" + this);
};
//check jquery Class
String.prototype.JqueryClass = function () {
    return (this == "" || this[0] == '.') ? String(this) : String("." + this);
};

//remove HTML tags
String.prototype.strip_tags = function () {
    return this.replace(/(<([^>]+)>)/ig, "");
};


//start with
String.prototype.startWith = function (prefix) {
    return this.indexOf(prefix) === 0;
};

//end with
String.prototype.endWith = function (suffix) {
    return this.match(suffix + "$") == suffix;
};

String.prototype.addSpaceBeforeCapitalLetters = function (suffix) {
    return this.replace(/([a-z])([A-Z])/g, "$1 $2");
};




//string Format
if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match;
        });
    };
}


isArray = function (a) {
    return (!!a) && (a.constructor === Array);
};

isObject = function (a) {
    return (!!a) && (a.constructor === Object);
};

isString = function (a) {
    return (!!a) && (a.constructor === String);
};
isFunction = function (a) {
    return (!!a) && (a.constructor === Function);
};