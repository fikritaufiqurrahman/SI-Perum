const express = require("express");
const loggedIn = require("../controllers/loggedIn")
const logout = require("../controllers/logout")

// const logout = require("../conrollers/logout")
const router = express.Router();

router.get("/", loggedIn, (req, res) => {
    if (req.user) {
        res.render("dashboard", { status: "loggedIn", user: req.user });
    } else {
        res.render("register", { status: "no", user: "nothing" })
    }
})
router.get("/register", (req, res) => {
    res.render("register", { root: "./public" })
})
router.get("/login", (req, res) => {
    res.render("login", { root: "./public" })

})
router.get("/logout", logout)

router.get("/room-chat", (req, res) => {
    res.render("landing-chat")
})
router.get("/chat", (req, res) => {
    res.render("chat")
})

module.exports = router;