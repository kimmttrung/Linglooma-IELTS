import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("home.ejs"); // bạn có thể đổi thành `res.send("Home")` nếu chưa có EJS
});

const initWebRoutes = (app) => {
    app.use("/", router);
};

export default initWebRoutes;