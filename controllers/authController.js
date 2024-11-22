const axios = require('axios');
var colors = require('colors');


exports.loginAsIntermediary = async (req, res) => {

    console.log('reached',req.body)
    
    const { onbehalfofTIN, clientId, clientSecret } = req.body;

    console.log('Client ID:', clientId, 'Client Secret:', clientSecret);


    const baseURL = 'https://preprod-api.myinvois.hasil.gov.my';  // Replace with actual URL

    try {
        
        const response = await axios.post(
            `${baseURL}/connect/token`,
            new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials',
                scope: 'InvoicingAPI'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'onbehalfof':  encodeURIComponent(onbehalfofTIN)
                }
            }
        );

        console.log('login sucessfully'.green)
        console.log('response'.yellow,response.status)

        
        if (response.status === 200) {
            const { access_token, token_type, expires_in, scope } = response.data;
           
            res.status(200).json({
                accessToken: access_token,
                tokenType: token_type,
                expiresIn: expires_in,
                scope: scope
            });
        }
    } catch (error) {

        console.log('error'.red,error?.response?.data)
        
        res.status(400).json({ error: error.response?.data?.error || 'Authentication failed' });
    }
};
