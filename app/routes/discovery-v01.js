// Add your routes here - above the module.exports line
var versionMiddleware = require("./versionMiddleware")

module.exports = function (router) {

    var version = "discovery-v01";

    versionMiddleware(router, version);

    router.get('/' + version + '/recommendation-where-is-school', function (req, res, next) {
        if (req.query.nation === 'england') {
            return res.redirect('/' + version + '/recommendation-where-is-school-england');
        }
        if (req.query.nation === 'scotland') {
            return res.redirect('/' + version + '/recommendation-where-is-school-scotland');
        }
        next();
    })

    router.get('/' + version + '/recommendation-where-is-school-england', function (req, res, next) {
        if (req.query['school-type'] === 'private') {
            return res.redirect('/' + version + '/recommendation-england-contact-private-school');
        }
        if (req.query['school-type'] === 'state') {
            return res.redirect('/' + version + '/recommendation-england-complaint-to-school');
        }
        next();
    })

    router.get('/' + version + '/recommendation-england-complaint-to-school', function (req, res, next) {
        if (req.query['complaint-to-school'] === 'no') {
            return res.redirect('/' + version + '/recommendation-england-raise-your-concern');
        }
        if (req.query['complaint-to-school'] === 'yes') {
            return res.redirect('/' + version + '/recommendation-england-completed-procedure');
        }
        next();
    })

    router.get('/' + version + '/recommendation-england-completed-procedure', function (req, res, next) {
        if (req.query['completed-procedure'] === 'no') {
            return res.redirect('/' + version + '/recommendation-england-child-getting-education');
        }
        if (req.query['completed-procedure'] === 'yes') {
            return res.redirect('/' + version + '/recommendation-england-complaint-about');
        }
        next();
    })

    router.get('/' + version + '/recommendation-england-child-getting-education', function (req, res, next) {
        if (req.query['getting-education'] === 'no') {
            return res.redirect('/' + version + '/recommendation-england-contact-dfe');
        }
        next();
    })

    router.get('/' + version + '/recommendation-england-complaint-about', function (req, res, next) {
        if (req.query['complaint-about'] === 'serious-teacher-misconduct') {
            return res.redirect('/' + version + '/recommendation-england-contact-tra');
        }
        if (req.query['complaint-about'] === 'systemic-issues') {
            return res.redirect('/' + version + '/recommendation-england-contact-ofsted');
        }
        if (req.query['complaint-about'] === 'child-exposed-to-harm') {
            return res.redirect('/' + version + '/recommendation-england-contact-dfe');
        }
        if (req.query['complaint-about'] === 'sen-provision') {
            return res.redirect('/' + version + '/recommendation-england-child-still-at-school');
        }
        next();
    })

    router.get('/' + version + '/recommendation-england-child-still-at-school', function (req, res, next) {
        if (req.query['child-still-at-school'] === 'no') {
            return res.redirect('/' + version + '/recommendation-england-child-still-in-education');
        }
        if (req.query['child-still-at-school'] === 'yes') {
            return res.redirect('/' + version + '/recommendation-england-spoken-to-senco');
        }
        next();
    })

    router.get('/' + version + '/recommendation-england-child-still-in-education', function (req, res, next) {
        if (req.query['child-still-in-education'] === 'yes') {
            return res.redirect('/' + version + '/recommendation-england-cannot-complain-retrospectively');
        }
        if (req.query['child-still-in-education'] === 'no') {
            return res.redirect('/' + version + '/recommendation-england-contact-dfe');
        }
        next();
    })

    router.get('/' + version + '/recommendation-england-spoken-to-senco', function (req, res, next) {
        if (req.query['spoken-to-senco'] === 'yes') {
            return res.redirect('/' + version + '/recommendation-england-sen-complaints-options');
        }
        if (req.query['spoken-to-senco'] === 'no') {
            return res.redirect('/' + version + '/recommendation-england-speak-to-the-schools-senco');
        }
        if (req.query['spoken-to-senco'] === 'no-senco') {
            return res.redirect('/' + version + '/recommendation-england-speak-to-the-school');
        }
        next();
    })

}

