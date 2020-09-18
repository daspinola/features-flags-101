const express = require('express')
const path = require('path')
const { initialize, isEnabled } = require('unleash-client');
const instance = initialize({
    url: 'http://localhost:4242/api/',
    appName: 'feature-flags',
    instanceId: 'feature-flags-101',
});

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/feature-flag/:name?', function(req, res) {
  const flagName = req.params.name

  res.send({
    flagName,
    isEnabled: isEnabled(flagName)
  })

})

// We add this way so our server only starts when the flags are available
instance.on('ready', () => {
  app.listen(7000, function () {
    console.log(`Listening on port ${7000}!`)
  })
})

