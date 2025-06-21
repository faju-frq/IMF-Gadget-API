import { DataTypes } from 'sequelize'

const gadgetModel = (sequelize) => {
  const Gadgets = sequelize.define(
    'Gadgets',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.UUID
      },
      owner_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      skin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      mission_success_probability: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
        defaultValue: 'Available',
        allowNull: false
      },
      deployed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      self_destruct_sequence: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      decommissioned_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      destroyed_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    { underscored: true }
  )
  return Gadgets
}

export default gadgetModel
