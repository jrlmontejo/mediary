const express = require('express')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const error = require('../utils/error')
const propTypes = require('../utils/propTypes')
const clearModelData = require('../utils/clearModelData')

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

    const requiredProps = []

    template.fields.forEach(field => {
      const prop = { [field.name]: {} }

      prop[field.name].type = propTypes(field.type)

      if (field.options.required) {
        prop[field.name].required = true
        requiredProps.push(field.name)
      }

      // field specific options
      switch(field.type) {
        case 'select':
          prop[field.name].enum = Object.keys(field.options.items)
          break
      }

      schema.add(prop)
    })

    // clear model data existing from memory
    clearModelData('Entry')

    const Entry = mongoose.model('Entry', schema)
    const entry = new Entry()

    const entryData = req.body

    Object.keys(entryData).forEach(prop => {
      if (requiredProps.includes(prop)) {
        entry[prop] = entryData[prop]
      }
    })

    await entry.save()

    res.status(204).send()
  } catch(err) {
    console.error(err)

    if (err.code === 'ENOENT') {
      return res.status(404).json(error('NOT_FOUND'))
    }

    // validation errors
    if (err.hasOwnProperty('errors')) {
      return res.status(400).json(error('SAVE_FAILED', err.errors))
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