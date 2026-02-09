// Add your routes here - above the module.exports line
var versionMiddleware = require("./versionMiddleware")

module.exports = function (router) {

    var version = "discovery-v01";

    versionMiddleware(router, version);

    router.get('/' + version + '/recommendation-where-is-school', function (req, res, next) {
        if (req.query.nation === 'scotland') {
            return res.redirect('/' + version + '/recommendation-where-is-school-scotland');
        }
        next();
    })

}

