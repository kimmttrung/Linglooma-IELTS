require("dotenv").config(); // use env
const jwt = require("jsonwebtoken");

const jwtauth = (req, res, next) => {
    const allow_list = ["/", "/register", "/login"];

    if (allow_list.find(item => '/api' + item === req.originalUrl)) {
        next();
    } else {
        if (req?.headers?.authorization?.split(' ')?.[1]) {
            const token = req.headers.authorization.split(' ')[1];
            next();
            // // verify token
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = {
                    email: decoded.email,
                    name: decoded.name,
                }
            } catch (error) {
                return res.status(401).json({
                    message: "Token bị hết hạn hoặc không hợp lệ"
                })
            }

        } else {
            // return exception 
            return res.status(401).json({
                message: "Bạn chưa truyền access toke ở header hoặc token bị hết hạn"
            })
        }
    }
}

module.exports = jwtauth;