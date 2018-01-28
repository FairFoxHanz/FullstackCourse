const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new SchemaType({
  email: String,
  clicked: { type: Boolean, default: false }
});

module.exports = recipientSchema;