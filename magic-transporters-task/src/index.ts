import express from "express";
import { connectDB } from "./database-connection";
import moversRouter from "./routes/magic-mover";
import itemsRouter from "./routes/magic-item";
import missionRouter from "./routes/mission-log";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

// Routes
app.use("/movers", moversRouter);
app.use("/items", itemsRouter);
app.use("/missions", missionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
