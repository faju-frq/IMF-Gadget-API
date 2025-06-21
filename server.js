import express from "express";
import "dotenv/config";
import cors from "cors";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/auth.route.js";
import gadgetRoutes from "./routes/gadget.route.js";
import deploymentRoutes from "./routes/deployment.route.js";
import selfDestructRoutes from "./routes/selfdestruct.route.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./swagger.js"

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/gadgets", gadgetRoutes);
app.use("/api/deployment", deploymentRoutes);
app.use("/api/destruction", selfDestructRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log("Database connected and models synced.");
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error("Error syncing database:", err);
  }
});
