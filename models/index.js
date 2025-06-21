import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
  }
);

import userModel from "./user.model.js";
import gadgetModel from "./gadget.model.js";

export const User = userModel(sequelize);
export const Gadgets = gadgetModel(sequelize);

User.hasOne(Gadgets, { foreignKey: "user_id", onDelete: "CASCADE" });
Gadgets.belongsTo(User, { foreignKey: "user_id" });
