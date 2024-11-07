const express = require('express');
const router = express.Router();
const {submitDocuments} = require('../controllers/invoiceControllers');

/**
 * Controller function to submit documents to MyInvois System.
 * This function handles the submission of one or more signed documents on behalf of the taxpayer.
 *
 * Required Parameters in Headers:

 * - Content-Type: Defines the document submission format, either 'application/json' or 'application/xml'.:- mentioned in doc
 * - onbehalfofTIN: TIN of the taxpayer represented by the intermediary.
 * - Authorization: Bearer access token obtained after successful login.


 *
 * Required Body Parameters:
 * - documents: Array of Document objects to submit.
 *    - Each document object should have:
 *      - format: Format of the document, either 'XML' or 'JSON'.
 *      - document: Base64-encoded string of the document content (JSON/XML).
 *      - documentHash: SHA256 hash of the document content for integrity verification.
 *      - codeNumber: Unique reference number for internal tracking (e.g., INV12345).
 *
 * Output:
 * - Returns a JSON response containing:
 *    - submissionUID: Unique ID of the submission.
 *    - acceptedDocuments: Array of accepted document objects with unique IDs.
 *    - rejectedDocuments: Array of rejected document objects with error details.
 */


router.post('/submit',submitDocuments);



module.exports = router; 

