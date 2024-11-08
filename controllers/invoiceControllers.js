const { xmlToBase64, base64XmlToSHA256 } = require("../helpers/index");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

exports.submitDocuments = async (req, res) => {

  const { authorizationtoken } = req.headers;

  const xmlData = req.body.toString();

  if (!authorizationtoken) {
    return res.status(400).json({
      error: "Missing required headers or document data",
      message:
        "Ensure TIN, authorization token, content-type, and document array are provided.",
    });
  }

  ///convert the document into base64 encoded version


  const convertedDocument = xmlToBase64(xmlData);

// hash the base64 encoded document

  const documentHash = base64XmlToSHA256(convertedDocument);

  console.log("documentHash".america, documentHash);



  const codeNumber = "INV12345"; 

  // Structure the payload for the API request
  const payload = {
    documents: [
      {
        format: "XML",  
        document: convertedDocument,  // The Base64-encoded XML document
        documentHash: documentHash,  // The SHA-256 hash of the Base64 document
        codeNumber: codeNumber, 
      },
    ],
  };


  // you can check the details of required fields of document file by refering to invoiceFieldsRequired.txt file

  try {
    const response = await axios.post(
      "https://preprod-api.myinvois.hasil.gov.my/api/v1.0/documentsubmissions/", //add correct baseurl here
       payload ,
    
    {
        headers: {
          "Authorization": `Bearer ${authorizationtoken}`,
          "Accept": "application/json", 
          "Accept-Language": "en", 
          "Content-Type": "application/json", 
        },
      }
    );

    console.log('document submitted successfully'.bgMagenta.white)

    console.log('result'.blue,{
      submissionUID: response.data.submissionUID,
      acceptedDocuments: response.data.acceptedDocuments,   
      rejectedDocuments: response.data.rejectedDocuments,
    })

    res.status(202).json({
      submissionUID: response.data.submissionUID,
      acceptedDocuments: response.data.acceptedDocuments,   
      rejectedDocuments: response.data.rejectedDocuments,
    });
  } catch (error) {
    // Handle errors and return response
    console.log("error occured".red,error?.response?.data?.error,error?.status);

    res.status(500).send({error:error?.response?.data?.error,status:error?.status})
  }
};
