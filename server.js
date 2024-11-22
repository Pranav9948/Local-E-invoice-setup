const QRCode = require('qrcode');
var colors = require('colors');


const uuid = '0VG95YXFXBCGSHANREF919DJ10';
const submissionUid = 'T7MNFTKAMMBZEDMAREF919DJ10sBXpFC1732248911';


const validationLink = `https://preprod.myinvois.hasil.gov.my/${uuid}/share/${submissionUid}`;

// Generate the QR code
QRCode.toFile('validation-qr-code.png', validationLink, { errorCorrectionLevel: 'H' }, (err) => {
  if (err) throw err;
  console.log('QR code saved as validation-qr-code.png!');
});
