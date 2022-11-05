const express = require("express");
const loggedIn = require("../controllers/loggedIn")
const logout = require("../controllers/logout")
const router = express.Router();


// loggedin
router.get("/", loggedIn, (req, res) => {
    if (req.user) {
        res.render("dashboard", { status: "loggedIn", user: req.user });
    } else {
        res.render("register", { status: "no", user: "nothing" })
    }
})

// register
router.get("/register", (req, res) => {
    res.render("register", { root: "./public" })
})

// login
router.get("/login", (req, res) => {
    res.render("login", { root: "./public" })
})

// logout
router.get("/logout", logout)

// room chat
router.get("/room-chat", (req, res) => {
    res.render("landing-chat")
})

// chat
router.get("/chat", (req, res) => {
    res.render("chat")
})

// update profil
// registrasi penduduk
// cari penduduk
// kelola keuangan
// input pemakaian air
// kelola pengumuman



module.exports = router;