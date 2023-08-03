const Shippo = require("shippo");
const express = require("express");
const router = express.Router();
const axios = require("axios");
var shippo = require("shippo")(
  "shippo_live_aae3a275ae46047466f0d9e39a7cb4018cc15afc"
);
const SHIPPO_API_TOKEN = "shippo_live_aae3a275ae46047466f0d9e39a7cb4018cc15afc";

const Order = {
  createOrder: async (req, res) => {
    const orderParams = {
      to_address: {
        city: "San Francisco",
        company: "Shippo",
        country: "US",
        email: "shippotle@goshippo.com",
        name: "Mr Hippo",
        phone: "15553419393",
        state: "CA",
        street1: "215 Clayton St.",
        zip: "94117",
      },
      line_items: [
        {
          quantity: 1,
          sku: "HM-123",
          title: "Hippo Magazines",
          total_price: "12.10",
          currency: "USD",
          weight: "0.40",
          weight_unit: "lb",
        },
      ],
      placed_at: "2016-09-23T01:28:12Z",
      order_number: "#1068",
      order_status: "PAID",
      shipping_cost: "12.83",
      shipping_cost_currency: "USD",
      shipping_method: "USPS First Class Package",
      subtotal_price: "12.10",
      total_price: "24.93",
      total_tax: "0.00",
      currency: "USD",
      weight: "0.40",
      weight_unit: "lb",
    };

    try {
      const response = await axios({
        method: "post",
        url: "https://api.goshippo.com/orders/",
        data: orderParams,
        headers: {
          Authorization: `ShippoToken ${SHIPPO_API_TOKEN}`,
        },
      });

      const createdOrder = response.data;
      if (createdOrder) {
        console.log(createdOrder.object_id);
      }
      res.json(createdOrder);
      console.log("Created order:", createdOrder);
    } catch (err) {
      console.log(err);
    }
  },
  createLabel: async (req, res) => {
    const labelParams = {
      "shipment": {
        "address_from": {
            "name": "Mr. Hippo",
            "street1": "215 Clayton St.",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94117",
            "country": "US",
            "phone": "+1 555 341 9393",
            "email": "support@goshippo.com"
        },
        "address_to": {
            "name": "Mrs. Hippo",
            "street1": "965 Mission St.",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94105",
            "country": "US",
            "phone": "+1 555 341 9393",
            "email": "support@goshippo.com"
        },
        "parcels": [{
            "length": "5",
            "width": "5",
            "height": "5",
            "distance_unit": "in",
            "weight": "2",
            "mass_unit": "lb"
        }]
    },
    "carrier_account": "b741b99f95e841639b54272834bc478c", // place your carrier_account here 
      "servicelevel_token": "usps_priority"
  // "order":"order number to get dynamic tracking address of soecific order"
    };
    try {
      const response = await axios({
        method: "post",
        url: "https://api.goshippo.com/transactions/",
        data: labelParams,
        headers: {
          Authorization: `ShippoToken ${SHIPPO_API_TOKEN}`,
        },
      });

      const createdLabel = response.data;

      res.json(createdLabel);
     
      
    } catch (err) {
      console.log(err);
    }
  },
};
module.exports = Order;
