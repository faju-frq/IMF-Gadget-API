import { Gadgets } from '../models/index.js'
import { transformGadget } from '../utils/transformGadget.helper.js'

export const gadgetDeployment = async (req, res) => {
  try {
    const user_id = req.user.id
    const { id } = req.params

    const gadget = await Gadgets.findByPk(id)

    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found' })
    }

    if (gadget.status !== 'Available') {
      return res.status(400).json({ message: 'Gadget not available for deployment.' })
    }

    await Gadgets.update(
      {
        status: 'Deployed',
        user_id: user_id,
        deployed_at: new Date()
      },
      { where: { id } }
    )

    const updatedGadget = await Gadgets.findByPk(id)

    const gadgets = transformGadget(updatedGadget)
    res.status(200).json({
      message: 'Gadget deployed successfully.',
      gadget: gadgets
    })
  } catch (err) {
    console.error('Error deploying gadget:', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
