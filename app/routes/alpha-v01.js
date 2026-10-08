module.exports = function (router) {
  router.get('/alpha-v01/intro', function (req, res, next) {
    const answer = req.query['school-procedure']

    if (answer) {
      req.session.data['school-procedure'] = answer
    }

    if (answer === 'followed' || answer === 'cannot-follow') {
      return res.redirect('/alpha-v01/where-is-the-school')
    }

    if (answer === 'not-spoken') {
      return res.redirect('/alpha-v01/speak-to-the-school')
    }

    next()
  })

  router.get('/alpha-v01/where-is-the-school', function (req, res, next) {
    if (req.query.nation === 'england') {
      return res.redirect('/alpha-v01/type-of-school')
    }

    if (req.query.nation === 'scotland') {
      return res.redirect('/alpha-v01/scotland')
    }

    if (req.query.nation === 'wales') {
      return res.redirect('/alpha-v01/wales')
    }

    if (req.query.nation === 'northern-ireland') {
      return res.redirect('/alpha-v01/northern-ireland')
    }

    next()
  })

  router.get('/alpha-v01/type-of-school', function (req, res, next) {
    if (req.query['school-type'] === 'private') {
      return res.redirect('/alpha-v01/private-schools')
    }

    if (req.query['school-type'] === 'state' && req.session.data['school-procedure'] === 'not-spoken') {
      return res.redirect('/alpha-v01/complaint-to-school')
    }

    if (req.query['school-type'] === 'state' && (req.session.data['school-procedure'] === 'followed' || req.session.data['school-procedure'] === 'cannot-follow')) {
      return res.redirect('/alpha-v01/type-of-complaint')
    }

    next()
  })
}
