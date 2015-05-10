'use strict';

const mailchimp = require('./modules/mailchimp/subscribe')
const koa       = require('koa')
const route     = require('koa-route')
const cors      = require('koa-cors')
const logger    = require('koa-logger')
const app       = koa()

// Use logger
app.use(logger())

// Use CORS
app.use(cors())

// Subscribe function
const subscribe = function* (isMentor) {
  // Get query string
  let query = this.request.query
  // Get result
  if (isMentor) {
    var result = yield mailchimp.subscribe(query.email, query.name)  
  } else {
    var result = yield mailchimp.subscribeAsMenotor(query.email, query.name)
  }
  
  // Set status and body, both are preserved from MailChimp
  this.status = result.status
  this.body   = result.body
}

// Calling `subscribe` with an extra argument
const subscribeAsMenotor = function* () {
  return yield subscribe.apply(this, [true])
}

// Handle NodeSchool MailChimp subscribtion
app.use(route.get('/nodeschool', subscribe))

// Handle NodeSchool Mentor MailChimp subscribtion
app.use(route.get('/nodeschool-mentor', subscribeAsMenotor))

// Listen ENV.PORT or 3000
app.listen(process.env.PORT || 3000)
