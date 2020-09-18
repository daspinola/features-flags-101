const unleash = require('unleash-server');

unleash
  .start({
    databaseUrl: 'postgres://postgres:pass@localhost:5432/unleash',
    port: 4242,
  })
  .then(unleash => {
    console.log(
      `Unleash started on http://localhost:${unleash.app.get('port')}`,
    );
  });