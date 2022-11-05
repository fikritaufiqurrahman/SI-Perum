const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    // Ambil data semua penduduk
    getAllBooks(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            let query = `SELECT * FROM registrasi;`;
            connection.query(query, function(error, results) {
                if (error) throw error;
                res.render("booklist", {
                    data: results,
                    url: "http://localhost:5000/",
                    userName: "fikri",
                });
            });
            connection.release();
        });
    },
    // Ambil data penduduk berdasarkan ID
    getBookById(req, res) {
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM registrasi WHERE id = ?;
                `, [id],
                function(error, results) {
                    if (error) throw error;
                    res.render("booklist", {
                        data: results,
                        url: "http://localhost:5000/",
                        userName: "fikri",
                    });
                }
            );
            connection.release();
        });
    },
    // Form add book
    formAddBook(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            let query = `SELECT * FROM t_kategori`;

            connection.query(query, function(error, results) {
                if (error) throw error;
                // console.log({data: results});
                res.render("tambahpenduduk", {
                    data: results,
                    url: "http://localhost:5000/",
                    userName: "fikri",
                });
            });
            connection.release();
        });
    },
    // Simpan data penduduk\penduduk\add
    addBook(req, res) {
        let data = {
            name: req.body.nama,
            nik: req.body.nik,
            nokk: req.body.nokk,
            telp: req.body.telp,
            email: req.body.email,
            hnumber: req.body.hnumber,
            headfamily: req.body.id_jenis,
        };
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO registrasi SET ?;
                `, [data],
                function(error, results) {
                    if (error) throw error;
                    res.redirect("/penduduk");
                }
            );
            connection.release();
        });
    },
    // Form add book
    formEdit(req, res) {
        let id = req.params.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            let query = `select * from registrasi where id = ${id}`
            connection.query(query, function(error, results) {
                if (error) throw error;
                // console.log({data: results});
                res.render("pendudukedit", {
                    id: results[0].id,
                    nama: results[0].name,
                    nik: results[0].nik,
                    nokk: results[0].nokk,
                    email: results[0].email,
                    hnumber: results[0].hnumber,
                    telp: results[0].telp,
                    url: "http://localhost:5000/",
                    userName: "fikri",
                });
            });
            connection.release();
        });
    },
    // Update data penduduk
    editBook(req, res) {
        let dataEdit = {
            name: req.body.nama,
            nik: req.body.nik,
            nokk: req.body.nokk,
            email: req.body.email,
            telp: req.body.telp,
            hnumber: req.body.hnumber,
            headfamily: req.body.id,
        };
        let id = req.body.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE registrasi SET ? WHERE id = ?;
                `, [dataEdit, id],
                function(error, results) {
                    if (error) throw error;
                    res.redirect('/penduduk')
                }
            );
            connection.release();
        });
    },
    // Delete data penduduk
    deleteBook(req, res) {
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM registrasi WHERE id = ?;
                `, [id],
                function(error, results) {
                    if (error) throw error;
                    res.redirect('/penduduk')
                }
            );
            connection.release();
        });
    },
};