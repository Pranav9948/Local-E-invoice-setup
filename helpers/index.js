const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

exports.xmlToBase64 =(xmlData) => {
    // Convert the XML string to a Buffer
    const buffer = Buffer.from(xmlData, 'utf-8');
    
    // Convert the Buffer to a Base64 string
    const base64Data = buffer.toString('base64');
    
    return base64Data;
  };
  

  /**
 * Function to convert base64-encoded XML document to SHA-256 hash.
 * @param {string} base64Xml - The base64-encoded XML document.
 * @returns {string} The SHA-256 hash of the decoded XML document.
 */
 exports.base64XmlToSHA256=(base64Xml)=> {
    // Decode the base64-encoded XML document
    const xmlData = Buffer.from(base64Xml, 'base64').toString('utf-8');
  
    // Generate SHA-256 hash from the decoded XML content
    const sha256Hash = crypto.createHash('sha256').update(xmlData).digest('hex');
  
    return sha256Hash;
  }