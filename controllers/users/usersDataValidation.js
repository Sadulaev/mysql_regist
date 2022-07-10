module.exports.isEmail = function(email) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!reg.test(email)) {
        return false;
    }
    return true;
}

module.exports.isName = function(name) {
    const reg = /^([A-Z])/
    if(!reg.test(name)) {
        return false;
    }
    return true;
}

module.exports.isPassword = function(password) {
    const reg = /[A-Z]+[a-z]+[0-9]+[!@#$%^&*]/
    if(!reg.test(password)) {
        return false;
    }
    return true;
}