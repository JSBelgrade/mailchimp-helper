'use strict';

const request = require('request')
const generatorify = require('../generatorify/index')

const ApiKey = 'fa6c621566b59fdf712ca59ada1c2bbf-us10'

// Convert request to generator
let subscribeGenerator = generatorify(request)

// Since MailChimp node module is piece of shit we are doing this a bad way
const subscribe = function* (listId, email, name) {
  // Generate Mailchimp subscribe URL
  let url = 'https://us10.api.mailchimp.com/2.0/lists/subscribe.json?' +
            'apikey=' + ApiKey + '&id=' + listId +
            '&email[email]=' + encodeURIComponent(email) +
            '&merge_vars[FNAME]=' + encodeURIComponent(name) +
            '&double_optin=false&send_welcome=false'

  // Call url
  let result = yield subscribeGenerator(url)

  // And return result
  return {
    body:   result[0].body,
    status: result[0].statusCode
  }

}

// And export public functions, all of them needs to be generators
module.exports = {
  subscribe:          function* (email, name) {
    let result = yield subscribe('257847b2d9', email, name)
    return result
  },
  subscribeAsMenotor: function* (email, name) {
    yeild* subscribe('cdeb4a431c', email, name)
  }
}
