const axios = require("axios");
var colors = require("colors");
const { validateRequest } = require("../helpers");

const API_HEADERS = {
  Accept: "application/json",
  "Accept-Language": "en",
  "Content-Type": "application/json",
};

const validateTIN = async (tin, idType, idValue, authorizationToken) => {
  const apiUrl = `https://preprod-api.myinvois.hasil.gov.my/api/v1.0/taxpayer/validate/${tin}`;
  try {
    const response = await axios.get(apiUrl, {
      params: { idType, idValue },
      headers: {
        ...API_HEADERS,
        Authorization: `Bearer ${authorizationToken}`,
      },
    });

    return response.status;
  } catch (error) {
    // Network or unknown error
    throw { status: 500, message: "Failed to connect to the TIN API.", error };
  }
};

exports.saveTravelAgentData = async (req, res) => {
  try {
    const { authorizationtoken } = req.headers;

    if (!authorizationtoken) {
      return res.status(400).json({
        error: "Missing required headers or document data",
        message: "Ensure  authorization token",
      });
    }

    const { tin, idType, idValue } = req.query;

    // Validate request parameters
    const validationError = validateRequest(tin, idType, idValue);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    try {
      const validationResult = await validateTIN(
        tin,
        idType,
        idValue,
        authorizationtoken
      );
      console.log("TIN Validation Result:", validationResult);

      if (validationResult === 200) {
        return res.status(200).json({
          message: "You have a valid TIN!",
          data: { tin, idType, idValue, validationResult },
        });
      } else {
        return res.status(404).json({
          message: "INvalid TIN!",
          data: { tin, idType, idValue, validationResult },
        });
      }
    } catch (error) {
      console.log("error".red, error.message);
      return error.message;
    }
  } catch (err) {
    console.log("error".red, error.message);
    return error.message;
  }
};
