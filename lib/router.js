let router = {};
var addRouter = function(method, url, fn){
    method = method.toLowerCase();
    url = url.toLowerCase();
    router[method] = router[method] || {};
    router[method][url] = fn;
}
var getRouter = function(method, url){
    method = method.toLowerCase();
    url = url.toLowerCase();
    if(!router[method] || !router[method][url]){
        return null;
    }
    return router[method][url];
}
module.exports = {
    addRouter,
    getRouter
}