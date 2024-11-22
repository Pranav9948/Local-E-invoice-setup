const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var colors = require('colors');



  ///convert the document into base64 encoded 

exports.jsonToBase64 = (jsonData) => {
  // Convert JSON object to a string
  const jsonString = JSON.stringify(jsonData);

  // Convert the JSON string to a Buffer
  const buffer = Buffer.from(jsonString, 'utf-8');

  // Convert the Buffer to a Base64 string
  const base64Data = buffer.toString('base64');

  return base64Data;
};
  

  /**
 * Function to convert base64-encoded XML document to SHA-256 hash.
 * @param {string} base64Xml - The base64-encoded XML document.
 * @returns {string} The SHA-256 hash of the decoded XML document.
 */
 exports.base64JsonToSHA256 = (base64Json) => {
  // Decode the base64-encoded JSON document
  const jsonData = Buffer.from(base64Json, 'base64').toString('utf-8');

  // Generate SHA-256 hash from the decoded JSON content
  const sha256Hash = crypto.createHash('sha256').update(jsonData).digest('hex');

  return sha256Hash;
};

//// Function to convert json data from req.body to UBL format which is important for submitting e-invoice

exports.convertToUBL=(InvoiceData) =>{
    
  const {Invoice}=InvoiceData
  
  const {AccountingSupplierParty,AccountingCustomerParty,LegalMonetaryTotal,TaxTotal,InvoiceLines}=Invoice


  
  const ublData = {
      "_D": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
"_A": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
"_B": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",

      Invoice: [
          {
              "ID": [{ _: Invoice.ID }],
              "IssueDate": [{ _: Invoice.IssueDate }],
              "IssueTime": [{ _: Invoice.IssueTime }],
              "InvoiceTypeCode": [
                  {
                   _: Invoice.InvoiceTypeCode.value,
                      "listVersionID": Invoice.InvoiceTypeCode.listVersionID,
                  },
              ],
              "DocumentCurrencyCode":[{ _:Invoice.DocumentCurrencyCode}],
              "TaxCurrencyCode": [{_:Invoice.TaxCurrencyCode}],

              "AccountingSupplierParty": [
                  {
                      "Party": [
                          {
                              "IndustryClassificationCode": [
                                  {
                                      _: AccountingSupplierParty.IndustryClassificationCode.value,
                                      "name": AccountingSupplierParty.IndustryClassificationCode.name,
                                  },
                              ],
                              "PartyIdentification": [
                                  {
                                      "ID": [
                                          {
                                              _: AccountingSupplierParty.PartyIdentification[0].id,
                                              "schemeID": AccountingSupplierParty.PartyIdentification[0].schemeID,
                                          },
                                      ],
                                  },
                                  {
                                      "ID": [
                                          {
                                              _: AccountingSupplierParty.PartyIdentification[1].id,
                                              "schemeID": AccountingSupplierParty.PartyIdentification[1].schemeID,
                                          },
                                      ],
                                  },
                              ],

                              "PostalAddress": [
                                  {
                                      "CityName": [{ _: AccountingSupplierParty.PostalAddress.CityName }],
                                      "PostalZone": [
                                          { _: AccountingSupplierParty.PostalAddress.PostalZone },
                                      ],
                                      "CountrySubentityCode": [
                                          { _: AccountingSupplierParty.PostalAddress.CountrySubentityCode },
                                      ],
                                    
                                      
                                      "AddressLine": AccountingSupplierParty.PostalAddress.AddressLines.map(
                                          (line) => ({
                                              Line: [{ _: line }],
                                          })
                                      ),
                                      "Country": [
                                          {
                                              "IdentificationCode": [
                                                  {
                                                      _: AccountingSupplierParty.PostalAddress.Country.IdentificationCode,
                                                      "listID": AccountingSupplierParty.PostalAddress.Country.listID,
                                                      "listAgencyID": AccountingSupplierParty.PostalAddress.Country.listAgencyID,
                                                  },
                                              ],
                                          },
                                      ],
                                  },
                              ],

                              
                              "PartyLegalEntity": [
                                  {
                                      "RegistrationName": [
                                          { _: AccountingSupplierParty.RegistrationName },
                                      ],
                                  },
                              ],
                              "Contact": [
                                  {
                                      "Telephone": [
                                          { _: AccountingSupplierParty.Contact.Telephone },
                                      ]
                                  },
                              ],
                          },
                      ],
                  },
              ],

              "AccountingCustomerParty": [
                  {
                      "Party": [
                          {
                              "PostalAddress": [
                                  {
                                      "CityName": [{ _: AccountingCustomerParty.PostalAddress.CityName }],
                                      "CountrySubentityCode": [
                                          { _: AccountingCustomerParty.PostalAddress.CountrySubentityCode },
                                      ],
                                      "AddressLine": AccountingCustomerParty.PostalAddress.AddressLines.map(
                                          (line) => ({
                                              Line: [{ _: line }],
                                          })
                                      ),
                                      "Country": [
                                          {
                                              "IdentificationCode": [
                                                  {
                                                      _: AccountingCustomerParty.PostalAddress.Country.IdentificationCode,
                                                     "listID": AccountingCustomerParty.PostalAddress.Country.listID,
                                                      "listAgencyID": AccountingCustomerParty.PostalAddress.Country.listAgencyID,
                                                  },
                                              ],
                                          },
                                      ],
                                  },
                              ],
                              "PartyLegalEntity": [
                                  {
                                      "RegistrationName": [
                                          { _: AccountingCustomerParty.RegistrationName },
                                      ],
                                  },
                              ],

                              "PartyIdentification": [
                                  {
                                      "ID": [
                                          {
                                              _: AccountingCustomerParty.PartyIdentification[0].ID.value,
                                              "schemeID": AccountingCustomerParty.PartyIdentification[0].ID.schemeID,
                                          },
                                      ],
                                  },
                                  {
                                      "ID": [
                                          {
                                              _: AccountingCustomerParty.PartyIdentification[1].ID.value,
                                              "schemeID": AccountingCustomerParty.PartyIdentification[1].ID.schemeID,
                                          },
                                      ],
                                  },
                                  {
                                      "ID": [
                                          {
                                              _: AccountingCustomerParty.PartyIdentification[2].ID.value,
                                              "schemeID": AccountingCustomerParty.PartyIdentification[2].ID.schemeID,
                                          },
                                      ],
                                  },
                                  {
                                      "ID": [
                                          {
                                              _: AccountingCustomerParty.PartyIdentification[3].ID.value,
                                              "schemeID": 
                                              AccountingCustomerParty.PartyIdentification[3].ID.schemeID,
                                          },
                                      ],
                                  },
                              ],
                            
                              "Contact": [
                                  {
                                      "Telephone": [
                                          { _:  AccountingCustomerParty.Contact.Telephone},
                                      ],
                                  },
                              ],
                          },
                      ],
                  },
              ],

              "LegalMonetaryTotal": [
                  {
                      "LineExtensionAmount": [
                          {
                              _:  LegalMonetaryTotal.LineExtensionAmount.value,
                              "currencyID": LegalMonetaryTotal.LineExtensionAmount.currencyID,
                          },
                      ],
                      "TaxExclusiveAmount": [
                          {
                              _: LegalMonetaryTotal.TaxExclusiveAmount.value,
                              "currencyID": LegalMonetaryTotal.TaxExclusiveAmount.currencyID,
                          },
                      ],
                      "TaxInclusiveAmount": [
                          {
                              _:  LegalMonetaryTotal.TaxInclusiveAmount.value,
                              "currencyID": LegalMonetaryTotal.TaxInclusiveAmount.currencyID,
                          },
                      ],
                      "PayableAmount": [
                          {
                              _: LegalMonetaryTotal.PayableAmount.value,
                              "currencyID": LegalMonetaryTotal.PayableAmount.currencyID,
                          },
                      ],
                  },
              ],

              "TaxTotal": [
                  {
                      "TaxAmount": [
                          {
                              _: TaxTotal.TaxAmount.value,
                              "currencyID": TaxTotal.TaxAmount.currencyID,
                          },
                      ],
                      "TaxSubtotal": [{
                          "TaxableAmount": [
                              {
                                  _: TaxTotal.TaxSubtotal.TaxableAmount.value,
                                  "currencyID": TaxTotal.TaxSubtotal.TaxableAmount.currencyID,
                              },
                          ],
                          "TaxAmount": [
                              {
                                  _: TaxTotal.TaxSubtotal.TaxAmount.value,
                                  "currencyID": TaxTotal.TaxSubtotal.TaxAmount.currencyID,
                              },
                          ],
                          "TaxCategory": [
                              {
                                  "ID": [{ _: TaxTotal.TaxSubtotal.TaxCategory.ID }],
                                  "TaxScheme": [
                                      {
                                          "ID": [
                                              {
                                                  _: TaxTotal.TaxSubtotal.TaxCategory.TaxScheme.ID,
                                                  "schemeID": TaxTotal.TaxSubtotal.TaxCategory.TaxScheme.schemeID,
                                                  "schemeAgencyID":
                                                  TaxTotal.TaxSubtotal.TaxCategory.TaxScheme.schemeAgencyID,
                                              },
                                          ],
                                      },
                                  ],
                              },
                          ],
                  }],
                  },
              ],

              "InvoiceLine": InvoiceLines.map((line) => ({
                  "ID": [{ _: line.ID }],
                  "InvoicedQuantity": [
                      { _: line.Quantity.value, unitCode: line.Quantity.unitCode },
                  ],
                  "LineExtensionAmount": [
                      { _: line.Amount.value, currencyID: line.Amount.currencyID },
                  ],
                  "TaxTotal": [
                      {
                          "TaxAmount": [
                              {
                                  _: line.Tax.TaxAmount.value,
                                  "currencyID": line.Tax.TaxAmount.currencyID,
                              },
                          ],
                          "TaxSubtotal":[{
                              "TaxableAmount": [
                                  {
                                      _: line.Tax.TaxSubtotal.TaxableAmount.value,
                                      "currencyID": line.Tax.TaxSubtotal.TaxableAmount.currencyID,
                                  },
                              ],
                              "TaxAmount": [
                                  {
                                      _:  line.Tax.TaxSubtotal.TaxAmount.value,
                                      "currencyID":  line.Tax.TaxSubtotal.TaxAmount.currencyID,
                                  },
                              ],
                              "TaxCategory": [
                                  {
                                      "ID": [{ _: line.Tax.TaxSubtotal.TaxCategory.ID }],
                                      "TaxScheme": [
                                          {
                                              "ID": [
                                                  {
                                                      _: line.Tax.TaxSubtotal.TaxCategory.TaxScheme.ID,
                                                      "schemeID": line.Tax.TaxSubtotal.TaxCategory.TaxScheme.schemeID,
                                                      "schemeAgencyID":
                                                          line.Tax.TaxSubtotal.TaxCategory.TaxScheme.schemeAgencyID,
                                                  },
                                              ],
                                          },
                                      ],
                                  },
                              ],
                          }],
                      },
                  ],
                  "Item": [
                      {
                          "CommodityClassification": [
                              {
                                  "ItemClassificationCode": [
                                      {
                                          _: line.Item.CommodityClassification.Code,
                                          "listID": line.Item.CommodityClassification.listID,
                                      },
                                  ],
                              },
                          ],
                          "Description": [
                              { _: line.Item.Description },
                          ],
                          "OriginCountry": [
                              {
                                  "IdentificationCode": [
                                      { _: line.Item.OriginCountry },
                                  ],
                              },
                          ],
                      },
                  ],
                  "Price": [
                      {
                          "PriceAmount": [
                              { _: line.Price.Amount.value, currencyID: line.Price.Amount.currencyID },
                          ],
                      },
                  ],
                  "ItemPriceExtension": [
                      {
                          "Amount": [
                              { _: line.ItemPriceExtension.Amount.value, currencyID: line.ItemPriceExtension.Amount.currencyID },
                          ],
                      },
                  ],
              })),

              "Signature": [ /// add all the fields 
                  {
                      "ID": [
                          {
                              "_": "urn:oasis:names:specification:ubl:signature:Invoice"
                          }
                      ],
                      "SignatureMethod": [
                          {
                              "_": "urn:oasis:names:specification:ubl:dsig:enveloped:xades"
                          }
                      ]
                  }
              ]


          },
      ],
  };

  return ublData;
}

/// this function will convert json data from postman to e invoice structure

exports.generateInvoice=(agentBooking,packageRooms,bookingTransportation,bookingActivities)=> {
    
    const invoice = {
        Invoice: {
            ID: "INV12345",
            IssueDate: "2024-11-20",
            IssueTime: "15:30:00Z",
            InvoiceTypeCode: {
                value: "01",
                listVersionID: "1.0"
            },
            DocumentCurrencyCode: "MYR",
            TaxCurrencyCode: "MYR",
            AccountingSupplierParty: {
                RegistrationName: agentBooking.Vendor.vendor_name || "Default Vendor Name",
                IndustryClassificationCode: {
                    value: "79110",
                    name: "Travel agency activities"
                },
                PartyIdentification: [
                    { id: "IG24357571080", schemeID: "TIN" },
                    { id: "Z5713582", schemeID: "PASSPORT" }
                ],
                Contact: {
                    Telephone: "+91-7736228299"
                },
                PostalAddress: {
                    CityName: "Kuala Lumpur",
                    PostalZone: "50480",
                    CountrySubentityCode: "10",
                    AddressLines: ["Lot 66", "Bangunan Merdeka", "Persiaran Jaya"],
                    Country: {
                        IdentificationCode: "MYS",
                        listID: "ISO3166-1",
                        listAgencyID: "6"
                    }
                }
            },
            AccountingCustomerParty: {
                RegistrationName: agentBooking.guest_name || "Default Guest",
                TIN: "EI00000000020",
                Contact: {
                    Telephone: agentBooking.primary_contact || "+91-7736228299"
                },
                PartyIdentification: [
                    { ID: { value: "EI00000000020", schemeID: "TIN" } },
                    { ID: { value: "NA", schemeID: "BRN" } },
                    { ID: { value: "NA", schemeID: "SST" } },
                    { ID: { value: "NA", schemeID: "TTX" } }
                ],
                PostalAddress: {
                    CityName: "Trivandrum",
                    CountrySubentityCode: "17",
                    AddressLines: [
                        "Pranavam",
                        "TC 9/618",
                        "Pariyamadom Lane",
                        "Kallampally, Sreekaryam"
                    ],
                    Country: {
                        IdentificationCode: "IND",
                        listID: "ISO3166-1",
                        listAgencyID: "6"
                    }
                }
            },
            LegalMonetaryTotal: {
                LineExtensionAmount: {
                    value: agentBooking.total_amount,
                    currencyID: "MYR"
                },
                TaxExclusiveAmount: {
                    value: agentBooking.total_amount,
                    currencyID: "MYR"
                },
                TaxInclusiveAmount: {
                    value: agentBooking.tax_with_total_amount,
                    currencyID: "MYR"
                },
                PayableAmount: {
                    value: agentBooking.tax_with_total_amount,
                    currencyID: "MYR"
                }
            },
            TaxTotal: {
                TaxAmount: {
                    value: agentBooking.tax_amount,
                    currencyID: "MYR"
                },
                TaxSubtotal: {
                    TaxableAmount: {
                        value: agentBooking.tax_amount,
                        currencyID: "MYR"
                    },
                    TaxAmount: {
                        value: agentBooking.tax_amount,
                        currencyID: "MYR"
                    },
                    TaxCategory: {
                        ID: "01",
                        TaxScheme: {
                            ID: "OTH",
                            schemeID: "UN/ECE 5153",
                            schemeAgencyID: "6"
                        }
                    }
                }
            },
            InvoiceLines: []
        }
    };

    // Populate Invoice Lines
    let lineID = 1;

    // Add booking activities
    if (bookingActivities) {
        bookingActivities.forEach(activity => {
            invoice.Invoice.InvoiceLines.push({
                ID: lineID.toString().padStart(3, "0"),
                Quantity: { value: 1, unitCode: "IE" },
                Amount: { value: activity.total_amount, currencyID: "MYR" },
                Tax: {
                    TaxAmount: { value: 0, currencyID: "MYR" },
                    TaxSubtotal: {
                        TaxableAmount: { value: 0, currencyID: "MYR" },
                        TaxAmount: { value: 0, currencyID: "MYR" },
                        TaxCategory: {
                            ID: "03",
                            TaxScheme: {
                                ID: "OTH",
                                schemeID: "UN/ECE 5153",
                                schemeAgencyID: "6"
                            }
                        }
                    }
                },
                Item: {
                    Description: activity.Product.product_name,
                    CommodityClassification: { Code: "008", listID: "CLASS" },
                    OriginCountry: "MYS"
                },
                Price: { Amount: { value: activity.total_amount, currencyID: "MYR" } },
                ItemPriceExtension: {
                    Amount: { value: activity.total_amount, currencyID: "MYR" }
                }
            });
            lineID++;
        });
    }

    // Add booking transportation
    if (bookingTransportation) {
       bookingTransportation.forEach((transport, index) => {
            invoice.Invoice.InvoiceLines.push({
                ID: lineID.toString().padStart(3, "0"),
                Quantity: {
                    value:
                        Number(transport.adult_resident_count) +
                        Number(transport.child_resident_count) +
                            Number(transport.infant_resident_count) +
                                Number(transport.toddler_resident_count) +
                                    Number(transport.adult_non_resident_count) +
                                        Number(transport.child_non_resident_count)+
                                            Number(transport.infant_non_resident_count) +
                                                Number(transport.toddler_non_resident_count),
                    unitCode: "IE"
                },
                Amount: { value: transport.total_cost, currencyID: "MYR" },
                Tax: {
                    TaxAmount: { value: 0, currencyID: "MYR" },
                    TaxSubtotal: {
                        TaxableAmount: { value: 0, currencyID: "MYR" },
                        TaxAmount: { value: 0, currencyID: "MYR" },
                        TaxCategory: {
                            ID: "03",
                            TaxScheme: {
                                ID: "OTH",
                                schemeID: "UN/ECE 5153",
                                schemeAgencyID: "6"
                            }
                        }
                    }
                },
                Item: {
                    Description: `${transport.transport_type} transportation from ${transport.from_location} to ${transport.to_location}`,
                    CommodityClassification: { Code: "008", listID: "CLASS" },
                    OriginCountry: "MYS"
                },
                Price: { Amount: { value: transport.total_cost, currencyID: "MYR" } },
                ItemPriceExtension: {
                    Amount: { value: transport.total_cost, currencyID: "MYR" }
                }
            });
            lineID++;
        });
    }

    // Add package rooms
    if (packageRooms) {
        packageRooms.forEach(room => {
            invoice.Invoice.InvoiceLines.push({
                ID: lineID.toString().padStart(3, "0"),
                Quantity: { value: Number(room.room_count), unitCode: "IE" },
                Amount: { value: Number(room.total_amount), currencyID: "MYR" },
                Tax: {
                    TaxAmount: { value: 0, currencyID: "MYR" },
                    TaxSubtotal: {
                        TaxableAmount: { value: 0, currencyID: "MYR" },
                        TaxAmount: { value: 0, currencyID: "MYR" },
                        TaxCategory: {
                            ID: "03",
                            TaxScheme: {
                                ID: "OTH",
                                schemeID: "UN/ECE 5153",
                                schemeAgencyID: "6"
                            }
                        }
                    }
                },
                Item: {
                    Description: room.RoomTypes.room_name,
                    CommodityClassification: { Code: "008", listID: "CLASS" },
                    OriginCountry: "MYS"
                },
                Price: { Amount: { value: Number(room.total_amount), currencyID: "MYR" } },
                ItemPriceExtension: {
                    Amount: { value: room.total_amount, currencyID: "MYR" }
                }
            });
            lineID++;
        });
    }

    return invoice;
}


exports.validateRequest=(tin, idType, idValue)=> {
    if (!tin) {
        return "Invalid or missing TIN";
    }

    const validIdTypes = ["NRIC", "PASSPORT", "BRN", "ARMY"];
    if (!idType || !validIdTypes.includes(idType.toUpperCase())) {
        return `Invalid or missing ID Type. Must be one of: ${validIdTypes.join(", ")}`;
    }

    if (!idValue) {
        return "Missing ID Value";
    }

    return null; 
}