require('dotenv').config()
const express = require('express')

const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Contact = require('./models/contact')

// Custom Morgan token to log body data
morgan.token('rB', (res) => JSON.stringify(res.body))

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :rB'))
/*
let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: '2020-01-10T17:30:31.098Z',
        important: true
      },
      {
        id: 2,
        content: 'Browser can execute only Javascript',
        date: '2020-01-10T18:39:34.091Z',
        important: false
      },
      {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2020-01-10T19:20:14.298Z',
        important: true
      }
]
*/

/*
let personss = [{
    'id': 1,
    'name': 'Arto Hellas',
    'number': '040-123456'
},{
    'id': 2,
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
},
{
    'id': 3,
    'name': 'Dan Abramov',
    'number': '12-43-234345'
},
{
    'id': 4,
    'name': 'Mary Poppendick',
    'number': '39-23-6423122'
}]
*/

// METHODS
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error('errorHandler: ', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'ValidatorError') {
    return response.status(400).json({ error: error.message })
  }
  return next(error)
}

/*
const getPhoneBookUserAmount = () => {
    let userAmount = persons.length
    return userAmount
}
*/

// ROOT
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// PERSONS ROUTES
app.get('/api/persons', (request, response, next) => {
  Contact.find({})
    .then((contacts) => {
      if (contacts) {
        response.json(contacts)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => {
      next(err)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  const paramId = request.params.id

  Contact.findById(paramId)
    .then((result) => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => {
      next(err)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const removeTarget = request.params.id

  if (removeTarget) {
    Contact.findByIdAndRemove({ _id: removeTarget }, (err) => {
      if (!err) {
        console.log('successful delete')
      } else {
        next(err)
      }
    })
    response.status(204).end()
  }
})

app.post('/api/persons', (request, response, next) => {
  const { body } = request

  if (!body.name) {
    response.status(400).json({
      error: 'name is missing',
    })
  }
  if (!body.number) {
    response.status(400).json({
      error: 'number is missing',
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })
  contact.save()
    .then((res) => response.send(res))
    .catch((err) => { next(err) })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request
  const person = {
    name: body.name,
    number: body.number,
  }

  Contact
    .findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

// INFO get
app.get('/info', (request, response, next) => {
  Contact.countDocuments({}, (err, count) => {
    if (count) {
      response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
    } else {
      next(err)
    }
  })
})

// response.send(`<p>Phonebook has info for ${personss.length} people</p><p>${new Date()}</p>`)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// AFTER
app.use(unknownEndpoint)
app.use(errorHandler)
