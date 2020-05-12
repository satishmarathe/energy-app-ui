var getEnergyBillSchema = {
    "$id": "https://example.com/arrays.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "A representation of a person, company, organization, or place",
    "type": "object",
    "properties": {
      "energyBills": {
        "type": "array",
        "items": { "$ref": "#/definitions/Energy" }
      }
    },
    "definitions": {
      "Energy": {
        "type": "object",
        "required": [ "id", "vendor" ],
        "properties": {
          "id": {
            "type": "string",
            "description": "The id of the vegetable."
          },
          "vendor": {
            "type": "string",
            "description": "Energy provider"
          },
          "fromDate": {
            "type": "string",
            "description": "Billing start Date"
          },
          "toDate": {
            "type": "string",
            "description": "Billing end Date"
          },
          "days": {
            "type": "string",
            "description": "Number of Billing days"
          },
          "receivedDate": {
            "type": "string",
            "description": "Date when Bill was received"
          },
          "dueDate": {
            "type": "string",
            "description": "Date when Bill is due"
          },
          "oaidDate": {
            "type": "string",
            "description": "Date when Bill was paid"
          },
          "billAmount": {
            "type": "string",
            "description": "Billing amount"
          },
          "comments": {
            "type": "string",
            "description": "Comments about this bill"
          }
        }
      }
    }
  };

  module.exports = getEnergyBillSchema;
