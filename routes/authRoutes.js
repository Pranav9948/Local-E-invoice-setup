const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



/**
 * Controller function to handle intermediary system login.
 * This function authenticates the ERP system representing a taxpayer and retrieves an access token, which is required to access protected APIs.

 * Required Parameters

 * - onbehalfofTIN: The Tax Identification Number (TIN) of the taxpayer for whom the intermediary is logging in. This is passed as a header.
 * - clientId: The client ID provided for the ERP system.
 * - clientSecret: The client secret associated with the ERP system.
 *
 * other Parameters:
 * - baseURL: The base URL .
 * - grantType: Type of grant for OAuth2.0 (default is 'client_credentials').
 * - scope: Access scope for the API (default is 'InvoicingAPI').
 *
 * Returns:
 * - A JSON response containing:
 *   - accessToken: JWT token for authorized access.
 *   - expiresIn: Token expiration time in seconds.
 *   - scope: Scope of access granted.
 
 */


router.post('/login/intermediary', authController.loginAsIntermediary);

// store the invoice access token in local storage which needs to refreshed after expiry time  for future use









module.exports = router;