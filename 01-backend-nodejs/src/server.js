import dotenv from "dotenv";
dotenv.config();
import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import initWebRoutes from "./routes/web.js";

// init 
const app = express();
const routerAPI = express.Router();

// config body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config view engine
configViewEngine(app);

// API route
routerAPI.get("/api", (req, res) => {
    res.json({ message: "Hello from API" });
});
app.use("/v1/api", routerAPI);

// web routes
initWebRoutes(app);

// start server
(async () => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(">>> JWT Backend is running on port " + process.env.PORT);
    });
})();
