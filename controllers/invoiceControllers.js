const { xmlToBase64, base64XmlToSHA256 } = require("../helpers/index");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

exports.submitDocuments = async (req, res) => {
  ////todo :- we need to convert the json based document into base64 before calling api request so need to build that function too

  const { authorizationtoken } = req.headers;

  const xmlData = req.body.toString();

  if (!authorizationtoken) {
    return res.status(400).json({
      error: "Missing required headers or document data",
      message:
        "Ensure TIN, authorization token, content-type, and document array are provided.",
    });
  }

  ////todo :- -here call a function to convert document into UBL (Universal Business Language) format, used for submitting structured invoice data to the Malaysian government as per the E-Invoice requirements.

  //   const UBlFormatDocument = convertDataToUBlFormat(documents);

  ////todo :- we need to convert the xml based document into base64 before calling api request so need to build that function too

  const convertedDocument = xmlToBase64(xmlData);

  const documentHash = base64XmlToSHA256(convertedDocument);

  console.log("documentHash", documentHash);



  const codeNumber = "INV12345"; // You can adjust this value as needed

  // Structure the payload for the API request
  const payload = {
    documents: [
      {
        format: "XML",  
        document: convertedDocument,  // The Base64-encoded XML document
        documentHash: documentHash,  // The SHA-256 hash of the Base64 document
        codeNumber: codeNumber,  // The code number (e.g., invoice number)
      },
    ],
  };


  // you can check the details of required fields of document file by refering to invoiceFieldsRequired.txt file

  try {
    const response = await axios.post(
      "https://preprod-api.myinvois.hasil.gov.my/api/v1.0/documentsubmissions/", //add correct baseurl here
       payload ,
    //   {
    //     headers: {
    //       "Authorization": `Bearer ${authorizationtoken}`, 
    //       "Contenttype": "application/json",
    //     },
    //   }

    {
        headers: {
          "Authorization": `Bearer ${authorizationtoken}`, // Bearer token for authorization
          "Accept": "application/json", // Accept header indicating JSON response
          "Accept-Language": "en", // Language preference for response (optional)
          "Content-Type": "application/json", // Content type set to JSON
        },
      }
    );

    res.status(202).json({
      submissionUID: response.data.submissionUID,
      acceptedDocuments: response.data.acceptedDocuments,   
      rejectedDocuments: response.data.rejectedDocuments,
    });
  } catch (error) {
    // Handle errors and return response
    console.log(error?.response?.data?.error,error?.status);

    res.status(500).send({error:error?.response?.data?.error,status:error?.status})
  }
};
