// https://github.com/SamyPesse/octocat.js
// https://docs.github.com/ru/rest
const GitHub = require("octocat");
const deasyncPromise = require("deasync-promise");
//
const c_excludeMethods = {
    'constructor': 1,
    'url': 1,
    'hasNext': 1,
    'hasPrev': 1
};
//
function createProxy(obj) {
    if (obj !== null) {
        if (obj.client) {
            if (obj.client.constructor.name == 'APIClient') {
                const names = Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter((name) => {
                    return typeof (c_excludeMethods[name]) == 'undefined' && typeof (obj[name]) == 'function';
                });
                for (const name of names) {
                    obj[name + 'Sync'] = function (...args) {
                        var ret = obj[name].call(obj, ...args);
                        if (ret.constructor.name == 'Promise') {
                            try {
                                ret = deasyncPromise(ret);
                            } catch (e) {
                                ret = null;
                            }
                        }
                        if (typeof (ret) == 'object') {
                            ret = createProxy(ret);
                        }
                        return ret;
                    }
                }
            }
        }
    }
    return obj;
}
//
function createGitHttp(token, url) {
    return createProxy(new GitHub({
        token: token,
        endpoint: url
    }));
}
module.exports = createGitHttp;