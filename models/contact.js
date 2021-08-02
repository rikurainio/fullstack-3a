const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then((result) => {
    console.log(result, ' connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },

  number: {
    type: String,
    required: true,
    minLength: 8,
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const returnedi = returnedObject

    returnedi.id = returnedi._id.toString()
    delete returnedi._id
    delete returnedi.__v
  },
})

contactSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Contact', contactSchema)
