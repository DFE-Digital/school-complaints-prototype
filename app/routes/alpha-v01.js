module.exports = function (router) {
  function missingAnswer (req, res, field) {
    if (req.query.submitted && !req.query[field]) {
      res.locals.error = true
      return true
    }

    return false
  }

  function hasIntroAnswer (req) {
    const answer = req.session.data['school-procedure']
    return answer === 'followed' || answer === 'cannot-follow' || answer === 'not-spoken'
  }

  function requireIntroAnswer (req, res) {
    if (!hasIntroAnswer(req)) {
      res.redirect('/alpha-v01/intro')
      return true
    }

    return false
  }

  function requireEnglandSchoolJourney (req, res) {
    if (requireIntroAnswer(req, res)) {
      return true
    }

    if (req.session.data.nation !== 'england') {
      res.redirect('/alpha-v01/where-is-the-school')
      return true
    }

    return false
  }

  router.get('/alpha-v01/intro', function (req, res, next) {
    delete req.session.data['raise-a-concern-from']

    if (missingAnswer(req, res, 'school-procedure')) {
      return next()
    }

    const answer = req.query['school-procedure']

    if (answer) {
      req.session.data['school-procedure'] = answer
    }

    if (answer === 'followed' || answer === 'cannot-follow' || answer === 'not-spoken') {
      return res.redirect('/alpha-v01/where-is-the-school')
    }

    next()
  })

  router.get('/alpha-v01/where-is-the-school', function (req, res, next) {
    if (requireIntroAnswer(req, res)) {
      return
    }

    if (missingAnswer(req, res, 'nation')) {
      return next()
    }

    const nation = req.query.nation

    req.session.data.nation = nation

    if (nation === 'england') {
      return res.redirect('/alpha-v01/type-of-school')
    }

    if (nation === 'scotland') {
      return res.redirect('/alpha-v01/scotland')
    }

    if (nation === 'wales') {
      return res.redirect('/alpha-v01/wales')
    }

    if (nation === 'northern-ireland') {
      return res.redirect('/alpha-v01/northern-ireland')
    }

    next()
  })

  router.get('/alpha-v01/type-of-school', function (req, res, next) {
    if (requireEnglandSchoolJourney(req, res)) {
      return
    }

    if (missingAnswer(req, res, 'school-type')) {
      return next()
    }

    if (req.query['school-type'] === 'private') {
      return res.redirect('/alpha-v01/private-schools')
    }

    if (req.query['school-type'] === 'state' && req.session.data['school-procedure'] === 'not-spoken') {
      req.session.data['raise-a-concern-from'] = 'type-of-school'
      return res.redirect('/alpha-v01/raise-a-concern')
    }

    if (req.query['school-type'] === 'state' && (req.session.data['school-procedure'] === 'followed' || req.session.data['school-procedure'] === 'cannot-follow')) {
      return res.redirect('/alpha-v01/type-of-complaint')
    }

    next()
  })

  router.get('/alpha-v01/type-of-complaint', function (req, res, next) {
    if (missingAnswer(req, res, 'complaint-type')) {
      return next()
    }

    const answer = req.query['complaint-type']

    if (answer) {
      req.session.data['complaint-type'] = answer
    }

    if (answer === 'harm') {
      return res.redirect('/alpha-v01/child-harm')
    }

    if (answer === 'staff-behaviour') {
      return res.redirect('/alpha-v01/contact-tra')
    }

    if (answer === 'suitable-education') {
      req.session.data['contact-dfe-from'] = 'type-of-complaint'
      return res.redirect('/alpha-v01/contact-dfe')
    }

    if (answer === 'poor-standards') {
      return res.redirect('/alpha-v01/contact-ofsted')
    }

    if (answer === 'sen-support') {
      return res.redirect('/alpha-v01/child-still-at-school')
    }

    if (answer === 'exams') {
      return res.redirect('/alpha-v01/exam-irregularities')
    }

    if (answer === 'something-else') {
      return res.redirect('/alpha-v01/something-else')
    }

    next()
  })

  router.get('/alpha-v01/something-else', function (req, res, next) {
    if (missingAnswer(req, res, 'other-complaint')) {
      return next()
    }

    const answer = req.query['other-complaint']

    if (answer) {
      req.session.data['other-complaint'] = answer
    }

    if (answer === 'discrimination') {
      return res.redirect('/alpha-v01/disability-discrimination')
    }

    if (answer === 'data-protection') {
      return res.redirect('/alpha-v01/contact-ico')
    }

    if (answer === 'complaints-process') {
      req.session.data['contact-dfe-from'] = 'something-else'
      return res.redirect('/alpha-v01/contact-dfe')
    }

    next()
  })

  router.get('/alpha-v01/disability-discrimination', function (req, res, next) {
    if (missingAnswer(req, res, 'disability-discrimination')) {
      return next()
    }

    const answer = req.query['disability-discrimination']

    if (answer) {
      req.session.data['disability-discrimination'] = answer
    }

    if (answer === 'yes') {
      return res.redirect('/alpha-v01/contact-send-tribunal')
    }

    if (answer === 'no') {
      return res.redirect('/alpha-v01/contact-eass')
    }

    next()
  })

  router.get('/alpha-v01/exam-irregularities', function (req, res, next) {
    if (missingAnswer(req, res, 'exam-irregularity')) {
      return next()
    }

    const answer = req.query['exam-irregularity']

    if (answer) {
      req.session.data['exam-irregularity'] = answer
    }

    if (answer === 'sats') {
      return res.redirect('/alpha-v01/contact-sta')
    }

    if (answer === 'secondary') {
      return res.redirect('/alpha-v01/contact-ofqual')
    }

    next()
  })

  router.get('/alpha-v01/child-still-at-school', function (req, res, next) {
    if (missingAnswer(req, res, 'child-still-at-school')) {
      return next()
    }

    const answer = req.query['child-still-at-school']

    if (answer) {
      req.session.data['child-still-at-school'] = answer
    }

    if (answer === 'yes') {
      return res.redirect('/alpha-v01/spoken-to-senco')
    }

    if (answer === 'no') {
      return res.redirect('/alpha-v01/child-still-in-education')
    }

    next()
  })

  router.get('/alpha-v01/child-still-in-education', function (req, res, next) {
    if (missingAnswer(req, res, 'child-still-in-education')) {
      return next()
    }

    const answer = req.query['child-still-in-education']

    if (answer) {
      req.session.data['child-still-in-education'] = answer
    }

    if (answer === 'yes') {
      req.session.data['contact-dfe-from'] = 'child-still-in-education'
      return res.redirect('/alpha-v01/contact-dfe')
    }

    if (answer === 'no') {
      return res.redirect('/alpha-v01/cannot-complain-retrospectively')
    }

    next()
  })

  router.get('/alpha-v01/spoken-to-senco', function (req, res, next) {
    if (missingAnswer(req, res, 'spoken-to-senco')) {
      return next()
    }

    const answer = req.query['spoken-to-senco']

    if (answer) {
      req.session.data['spoken-to-senco'] = answer
    }

    if (answer === 'yes') {
      return res.redirect('/alpha-v01/sen-complaints-options')
    }

    if (answer === 'no') {
      return res.redirect('/alpha-v01/speak-to-schools-senco')
    }

    if (answer === 'no-senco') {
      return res.redirect('/alpha-v01/speak-to-the-school')
    }

    next()
  })

  router.get('/alpha-v01/child-harm', function (req, res, next) {
    if (missingAnswer(req, res, 'harm-detail')) {
      return next()
    }

    const answer = req.query['harm-detail']

    if (answer) {
      req.session.data['harm-detail'] = answer
    }

    if (answer === 'child-protection-at-school') {
      return res.redirect('/alpha-v01/contact-local-council')
    }

    if (answer === 'exposed-to-harm') {
      req.session.data['contact-dfe-from'] = 'child-harm'
      return res.redirect('/alpha-v01/contact-dfe')
    }

    next()
  })
}
