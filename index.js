require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

  app.get('/info', (request, response) => {
    response.send('<h1>Simply noteAPP</h1>')
  })
  
  app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
      response.json(note)
    })
  })

  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

  app.put('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note.important === true) {
      notes[id].important = false
      response.json(notes)
      console.log(notes)
    } else {
      notes[id].important = true
      response.json(notes)
    }
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
  })

  // const GenerateId = () => {
  //   const maxId = notes.length > 0
  //   ? Math.max(...notes.map(n=> n.id))
  //   : 0
  //   return maxId + 1
  // }

  app.post('/api/notes', (request, response) => {
    const body = request.body
    
    if (body.content === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note ({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
      response.json(savedNote)
    })
  }) 
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })