const express = require('express')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const error = require('../utils/error')

const Schema = mongoose.Schema
const router = express.Router()

//
// POST /collections/:name
// Add a new entry to collection
// PRIVATE
//
router.post('/:name', async (req, res) => {
  try {
    const name = req.params.name
    const templatePath = path.join(__dirname, '../templates', `${name}.json`)

    const content = await fs.readFileAsync(templatePath, 'utf8')

    if (!content) {
      return res.status(404).json(error('NOT_FOUND'))
    }

    const template = JSON.parse(content)
    const schema = new Schema()

    schema.set('timestamps', true)
    schema.set('collection', name)

    template.fields.forEach(field => {
      schema.add({ name: String })
    })

    const Entry = mongoose.model('Entry', schema)
    const entry = new Entry({
      name: "Testing!"
    })

    await entry.save()

    res.status(204).send()
  } catch(err) {
    console.error(err)

    if (err.code === 'ENOENT') {
      return res.status(404).json(error('NOT_FOUND'))
    }

    res.status(500).json(error())
  }
})

//
// GET /collections/:name
// Get collection entries
// PRIVATE
//
router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name


  } catch(err) {
    console.error(err)
    res.status(500).json(error())
  }
})

module.exports = router