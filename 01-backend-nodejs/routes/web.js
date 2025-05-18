import express from "express";
//import scoreRoutes from "./scoreRoutes.js";
const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello world");
    })

    return app.use("/", router);
    //app.use("/", router);
    //app.use("/api/score", scoreRoutes);
}

export default initWebRoutes;