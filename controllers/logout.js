const logout = (req, res) => {
    res.clearCookie("userRegistered");
    res.redirect("/login")
}
module.exports = logout;