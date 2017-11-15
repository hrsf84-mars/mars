const express = require('express');
const app = express();

const port = process.env.PORT || 7331;

app.get('/', (req, res) => {
  res.send('This is the landing page!');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
