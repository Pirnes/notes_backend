const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/info', (request, response) => {
  response.send('<h1>Simply noteAPP</h1>')
})

notesRouter.get('/:id', async (request, response) => {
    const note = await Note.findById(request.params.id)
      response.json(note)
})

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
    response.status(201).json(notes)
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

    const savedNote = await note.save()
    response.status(200).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
  const content = request.body.content
  const important = request.body.important

  const updatedNote = await Note.findByIdAndUpdate(request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' })
      response.json(updatedNote)
})

module.exports = notesRouter