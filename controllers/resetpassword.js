const db = require("../routes/db-config")
const bcrypt = require("bcryptjs")

const resetpassword = async(req, res) => {
    const { email } = req.body
    if (!email) return res.json({ status: "error", error: "Please Enter your email" })
    else {
        console.log(email);
        db.query('SELECT email FROM users WHERE email = ? ', [email], async(err, result) => {
            if (err) throw err;
            if (result[0]) {

                const password = await bcrypt.hash(Npassword, 8)
                db.query(`UPDATE password FORM users SET users = ${password}`)

                return res.json({ status: "success", success: "Password has been reset with new password" })
            } else {

                console.log(password)
                db.query('INSERT INTO users SET ?', { email: email, password: password }, (error, results) => {
                    if (error) throw error;
                    return res.json({ status: "success", success: "User has been registered" })

                })
            }
        })
    }
}
module.exports = resetpassword;