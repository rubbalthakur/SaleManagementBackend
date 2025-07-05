import express from "express";
// import morgan from "morgan";
const cors = require('cors');
// import helmet from "helmet";

import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import organisationProfileRoutes from "./routes/organisationProfile.route";
import userOrganisationRoutes from "./routes/userOrganisation.route";
import leadTypeRoutes from "./routes/leadType.route";
import leadSourceRoutes from "./routes/leadSource.route";
import leadRoutes from "./routes/lead.route";
import leadMessageRoutes from "./routes/leadMessage.route";
import clientRoutes from "./routes/client.route";
import proposalRoutes from "./routes/proposal.route";
import { authenticateToken } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cors());
// app.use(helmet());
// app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/member", authenticateToken, userRoutes);
app.use("/api/member", authenticateToken, organisationProfileRoutes);
app.use("/api/member", authenticateToken, userOrganisationRoutes);
app.use("/api/member", authenticateToken, leadTypeRoutes);
app.use("/api/member", authenticateToken, leadSourceRoutes);
app.use("/api/member", authenticateToken, leadRoutes);
app.use("/api/member", authenticateToken, leadMessageRoutes);
app.use("/api/member", authenticateToken, clientRoutes);
app.use("/api/member", authenticateToken, proposalRoutes);

app.use("/", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

export default app;
