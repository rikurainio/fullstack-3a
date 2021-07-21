const express = require('express')
const app = express()
const cors = require("cors")
var morgan = require("morgan")

//Custom Morgan token to log body data
morgan.token("rB", function getResBody(res) {
    return JSON.stringify(res.body)
})

/*
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
*/
//app.use(requestLogger)

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :rB'))

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2020-01-10T17:30:31.098Z",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2020-01-10T18:39:34.091Z",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2020-01-10T19:20:14.298Z",
        important: true
      }
]

let personss = [{
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"  
},{
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"   
},
{
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"   
},
{
    "id": 4,
    "name": "Mary Poppendick",
    "number": "39-23-6423122"   
}]

// METHODS
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const getPhoneBookUserAmount = () => {
    let userAmount = persons.length
    return userAmount
}


// ROOT
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})


// NOTES post get delete
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ 
        error: 'content missing' 
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)
    response.json(note)
})

app.get("/api/notes", (req, res) => {
    res.json(notes)
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})


// PERSONS get delete post put
app.get("/api/persons", (request, response) => {
    response.json(personss)
})

app.get("/api/persons/:id", (request, response ) => {
    const id = Number(request.params.id)
    person = personss.find(person => person.id === id)

    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    personss = personss.filter(person => person.id !== id)

    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    var hasMatch = false
    if (!body.name) {
        return response.status(400).json({ 
        error: 'name is missing' 
        })
    }
    if (!body.number) {
        return response.status(400).json({ 
        error: 'number is missing' 
        })
    }

    for(var index = 0; index < personss.length; index++){
        var name = personss[index].name
        if(name === body.name){
            hasMatch = true
            break
        }
    }

    if(hasMatch){
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
    }

    personss = personss.concat(person)
    response.json(person)
})

app.put("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const body = request.body
    let name = body.name
    let number = body.number
    console.log("new name for id ", id , ": ", name, "new number: ", number)

    updatedPerson = {
        "id": id,
        "name": name,
        "number": number
    }

    for(var i=0; i < personss.length; i++){
        if(personss[i].id === id){
            personss[i] = updatedPerson
        }
    }
    response.send("OK, updated person")
})

// INFO get
app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${personss.length} people</p><p>${new Date()}</p>`);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// AFTER

app.use(unknownEndpoint)