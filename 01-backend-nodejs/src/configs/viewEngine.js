import express from "express";

/**
 * 
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs"); // use html css = ejs
    app.set("views", "./src/views"); // nơi lưu trữ file
}

export default configViewEngine;