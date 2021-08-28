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
        "required": [ "id" ],
        "properties": {
          "id": {
            "type": "integer",
            "description": "The id of the vegetable."
          },
          "fromDate": {
            "type": "string",
            "format": "date",
            "description": "To Date"
          },
          "toDate": {
            "type": "string",
            "format": "date",
            "description": "Billing end Date"
          },
          "days": {
            "type": "integer",
            "description": "Number of Billing days"
          },
          "fromReading": {
            "type": "number",
            "description": "Meter reading start"
          },
          "toReading": {
            "type": "number",
            "description": "Meter reading end"
          },
          "m3": {
            "type": "number",
            "description": "Volumetric consumption"
          },
          "heatingValue": {
            "type": "number",
            "description": "Calorific value of gas"
          },
          "pressure": {
            "type": "number",
            "description": "Pressure Value"
          },
          "mj": {
            "type": "number",
            "description": "Usage in MJ"
          },
          "usageCost": {
            "type": "number",
            "description": "Calculated value of cost based on usage"
          },
          "dailySupplyCost": {
            "type": "number",
            "description": "Daily rate"
          },
          "totalCost": {
            "type": "number",
            "description": "Total Bill Amount"
          }
        }
      }
    }
  };

  module.exports = getEnergyBillSchema;
