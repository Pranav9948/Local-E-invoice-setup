
const QRCode = require('qrcode');

// Data for the QR Code

const uuid = '0VG95YXFXBCGSHANREF919DJ10';
const submissionUid = 'T7MNFTKAMMBZEDMAREF919DJ10sBXpFC1732248911';


const validationLink = 
 `https://preprod.myinvois.hasil.gov.my/${uuid}/share/${submissionUid}`



 function removeDataURIPrefix(base64String) {
    const prefix = "data:image/png;base64,";
    if (base64String.startsWith(prefix)) {
      return base64String.slice(prefix.length);
    }
    return base64String; 
  }



// 1. Generate and print the QR code in the terminal
QRCode.toString(validationLink, { type: 'terminal' }, function (err, QRcode) {
  if (err) return console.log("Error occurred while generating QR code for terminal:", err);

  // Printing the QR Code
  console.log("QR Code (Terminal):");
  console.log(QRcode);
});

// 2. Generate a Base64 representation of the QR code
QRCode.toDataURL(validationLink, function (err, code) {
  if (err) return console.log("Error occurred while generating QR code as Base64:", err);

  // Printing the Base64 QR Code
  console.log("QR Code (Base64):");

  const cleanedBase64 = removeDataURIPrefix(code);

  console.log("base64".america,cleanedBase64);
});
