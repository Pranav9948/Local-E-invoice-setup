

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const inVoiceRoutes = require('./routes/invoiceRoutes');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');



const path = require('path');

const app = express();


app.use(bodyParser.raw({ type: 'application/xml', limit: '10mb' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', authRoutes);
app.use('/api/invoice', inVoiceRoutes);






  const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
});