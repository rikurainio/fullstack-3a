// Mongoose stuff
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
})

const password = process.argv[2]
const url = `mongodb+srv://rsrainio:${password}@phonebookcluster.giyqv.mongodb.net/Contacts?retryWrites=true&w=majority`

const Contact = mongoose.model('Contact', contactSchema)
const ArgLen = process.argv.length

// Working
if (ArgLen < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (ArgLen === 3) {
  mongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
  })
  console.log('phonebook:')

  const contacts = Contact.find({}).then((contact) => {
    for (let i = 0; i < contact.length; i += 1) {
      const { name } = contact[i]
      const { number } = contact[i]

      console.log(contacts, name, ' ', number)
      mongoose.connection.close()
    }
  })
}

if (ArgLen === 5) {
  mongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
  })

  const contactName = process.argv[3]
  const contactNumber = process.argv[4]

  // Create new contact node
  const contact = new Contact({
    id: Math.floor(Math.random() * 1000),
    name: process.argv[3],
    number: process.argv[4],
  })

  contact.save().then((response) => {
    console.log('response ', response)
    console.log(`Added ${contactName} number ${contactNumber} to phonebook`)
    mongoose.connection.close()
  })
}
