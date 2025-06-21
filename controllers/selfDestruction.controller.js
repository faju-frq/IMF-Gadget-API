import { Gadgets } from '../models/index.js'
import { transformGadget } from '../utils/transformGadget.helper.js'

export const selfDestructGadget = async (req, res) => {
  try {
    const user_id = req.user.id
    const { id } = req.params
    const gadget = await Gadgets.findOne({
      where: { id, user_id, status: 'Deployed' }
    })

    if (!gadget) {
      return res.status(404).json({ message: 'Gadget cannot be self destructed.' })
    }

    const destructCode = gadget.self_destruct_sequence

    await Gadgets.update({ status: 'Destroyed', destroyed_at: new Date() }, { where: { id } })
    const destroyed = await Gadgets.findByPk(id, { attributes: ['status', 'destroyed_at'] })

    return res.status(200).json({
      message: 'Gadget self-destructed successfully.',
      self_destruct_sequence: destructCode,
      status: destroyed.status,
      destroyed_at: destroyed.destroyed_at
    })
  } catch (err) {
    console.error('Error during gadget self-destruction:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
