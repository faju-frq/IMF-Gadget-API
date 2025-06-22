import { Gadgets } from '../models/index.js'
import crypto from 'node:crypto'
import { uniqueNamesGenerator, adjectives, animals, colors } from 'unique-names-generator'
import { transformGadget } from '../utils/transformGadget.helper.js'
import { Op } from 'sequelize'

export const postGadgets = async (req, res) => {
  try {
    const owner_id = req.user.id
    if (!owner_id) {
      return res.status(401).json({ message: 'Unauthorised access' })
    }
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: ''
    })

    const randomSkin = uniqueNamesGenerator({
      dictionaries: [colors],
      length: 1
    })
    const missionSuccessProbability = Math.floor(Math.random() * 100 + 1)
    const selfDestructSequence = crypto.randomInt(100000, 999999)

    const newGadget = await Gadgets.create({
      owner_id,
      name: randomName,
      skin: randomSkin,
      mission_success_probability: missionSuccessProbability,
      self_destruct_sequence: selfDestructSequence
    })

    const gadget = transformGadget(newGadget)

    res.status(201).json({ message: 'Gadget generated successfully.', gadget: gadget })
  } catch (err) {
    console.error('Error generating gadget: ', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

export const listGadgets = async (req, res) => {
  try {
    const { status } = req.query

    const filter = {}
    if (status) {
      filter.status = status
    } else {
      filter.status = { [Op.ne]: 'Decommissioned' }
    }

    const allgadgets = await Gadgets.findAll({ where: filter })

    if (allgadgets.length === 0) {
      return res.status(404).json({
        message: `No gadgets found${status ? ` with status '${status}'` : ''}.`
      })
    }

    const gadgets = allgadgets.map(transformGadget)

    res.status(200).json(gadgets)
  } catch (err) {
    console.error('Error listing gadgets.', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

export const updateGadgets = async (req, res) => {
  try {
    const id = req.params.id
    const { name, skin } = req.body
    const fieldsToUpdate = {}
    if (name !== undefined) fieldsToUpdate.name = name
    if (skin !== undefined) fieldsToUpdate.skin = skin

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(204).json({ message: 'No fields to update provided' })
    }
    await Gadgets.update(fieldsToUpdate, {
      where: { id }
    })

    const updatedGadget = await Gadgets.findByPk(id)

    if (!updatedGadget) {
      return res.status(404).json({ message: 'Gadget not found' })
    }

    let message = ''

    if (fieldsToUpdate.name && fieldsToUpdate.skin) {
      message = 'Name and skin updated successfully.'
    } else if (fieldsToUpdate.name) {
      message = 'Name updated succesfully.'
    } else if (fieldsToUpdate.skin) {
      message = 'Skin updated successfully.'
    }

    const gadgets = transformGadget(updatedGadget)

    res.status(200).json({ message: message, gadget: gadgets })
  } catch (err) {
    console.error('Error in updating gadget details.', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

export const deleteGadgets = async (req, res) => {
  try {
    const id = req.params.id

    const gadget = await Gadgets.findByPk(id)

    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found.' })
    }
    await Gadgets.update(
      {
        status: 'Decommissioned',
        decommissioned_at: new Date()
      },
      { where: { id } }
    )
    const updatedGadget = await Gadgets.findByPk(id, {
      attributes: ['status', 'decommissioned_at']
    })
    return res.status(200).json({
      message: 'Gadget decommissioned successfully.',
      status: updatedGadget.status,
      decommissioned_at: updatedGadget.decommissioned_at
    })
  } catch (error) {
    console.error('Error decommissioning gadget:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
