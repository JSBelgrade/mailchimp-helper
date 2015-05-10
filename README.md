# mailchimp-helper
Handles subscription to MailChimp because their JS API sucks

## How to install

### Prerequests

1. io.js or node.js with `--harmony` flag
2. `MAILCHIMP_API_KEY`, `NODESCHOOL_LIST_ID` and `NODESCHOOL_MENTOR_LIST_ID` in 
process env variables.
3. Symlink from `/node_modules/_` to `/modules`, this will be auto created on
Mac and Linux, on Windows it need to be created manually.

### Steps

1. Run `npm install`
2. Run `node index.js`
