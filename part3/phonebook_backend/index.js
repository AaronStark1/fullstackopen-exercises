const express = require('express')
const morgan = require('morgan')

const app = express()

const cors = require('cors')

app.use(cors())

// Custom morgan token 
morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')

// Use morgan with custom format that includes the request body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())
let persons = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]


  
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if(person)
        response.json(person)
    else
        response.status(404).end()
})

app.get('/info', (request, response) => {
    const length = persons.length
    const currentTime = new Date()
    response.send (
        `<p>Phonebook has info for ${length} people</p>
        <p>${currentTime}</p>`
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 1000000).toString()
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'name or number is missing' 
        })
    }
    const nameExists = persons.some(person => person.name === body.name);
    if (nameExists) {
        return response.status(400).json({
            error: 'Name must be unique'
        });
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
        
      }
    
      persons = persons.concat(person)
      response.json(person)
      
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})