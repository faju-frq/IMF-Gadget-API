import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});


import userModel from "./user.model.js";
import gadgetModel from "./gadget.model.js";

export const User = userModel(sequelize);
export const Gadgets = gadgetModel(sequelize);

User.hasOne(Gadgets, { foreignKey: "user_id", onDelete: "CASCADE" });
Gadgets.belongsTo(User, { foreignKey: "user_id" });
