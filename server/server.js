const express = require('express');
const app = express();
const cors = require('cors');

// config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api routes
app.use('/api/v2/auth', require('./routes/auth'));
app.use('/api/v2', require('./routes/user'));
app.use('/api/v2', require('./routes/url'));

// set timezone
process.env.TZ = 'Asia/Bangkok';

// port
const PORT = process.env.PORT || 8085

app.listen(PORT, () => {
  console.log('Server is running...');
});
