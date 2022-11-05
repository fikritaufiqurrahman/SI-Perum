const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    // Ambil data semua buku
    getAllData(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            let query = `SELECT * FROM t_buku 
        INNER JOIN t_kategori ON t_buku.id_kategori = t_kategori.id_kategori
        INNER JOIN t_jenis ON t_buku.id_jenis = t_jenis.id_jenis;`;
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
    // Ambil data buku berdasarkan ID
    getDataById(req, res) {
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM t_buku WHERE id_buku = ?;
                `, [id],
                function(error, results) {
                    if (error) throw error;
                    res.render("booklist", {
                        data: results,
                        url: "http://localhost:5000/",
                        userName: req.session.username,
                    });
                }
            );
            connection.release();
        });
    },
    // Form add book
    formAddData(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            let query = `SELECT * FROM t_kategori`;

            connection.query(query, function(error, results) {
                if (error) throw error;
                // console.log({data: results});
                res.render("tambahbuku", {
                    data: results,
                    url: "http://localhost:5000/",
                    userName: "fikri",
                });
            });
            connection.release();
        });
    },
    // Simpan data buku\buku\add
    addData(req, res) {
        let data = {
            judul_buku: req.body.judul,
            penerbit: req.body.penerbit,
            tahun: req.body.tahun,
            denda: req.body.denda,
            pengarang: req.body.pengarang,
            jumlah: req.body.jumlah,
            id_jenis: req.body.id_jenis,
            id_kategori: req.body.id_kategori,
        };
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO t_buku SET ?;
                `, [data],
                function(error, results) {
                    if (error) throw error;
                    res.redirect("/buku");
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
            let query = `select * from t_buku INNER JOIN t_kategori ON t_buku.id_kategori = t_kategori.id_kategori
      INNER JOIN t_jenis ON t_buku.id_jenis = t_jenis.id_jenis where id_buku = ${id}`
            connection.query(query, function(error, results) {
                if (error) throw error;
                // console.log({data: results});
                res.render("bukuedit", {
                    id_buku: results[0].id_buku,
                    judul: results[0].judul_buku,
                    penerbit: results[0].penerbit,
                    tahun: results[0].tahun,
                    pengarang: results[0].pengarang,
                    denda: results[0].denda,
                    jumlah: results[0].jumlah,
                    url: "http://localhost:5000/",
                    userName: "fikri",
                });
            });
            connection.release();
        });
    },
    // Update data Buku
    editData(req, res) {
        let dataEdit = {
            judul_buku: req.body.judul,
            penerbit: req.body.penerbit,
            tahun: req.body.tahun,
            denda: req.body.denda,
            pengarang: req.body.pengarang,
            jumlah: req.body.jumlah,
            id_jenis: req.body.jenis,
            id_kategori: req.body.kategori,
        };
        let id_buku = req.body.id_buku;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE t_buku SET ? WHERE id_buku = ?;
                `, [dataEdit, id_buku],
                function(error, results) {
                    if (error) throw error;
                    res.redirect('/buku')
                }
            );
            connection.release();
        });
    },
    // Delete data buku
    deleteData(req, res) {
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM t_buku WHERE id_buku = ?;
                `, [id],
                function(error, results) {
                    if (error) throw error;
                    res.redirect('/')
                }
            );
            connection.release();
        });
    },
};