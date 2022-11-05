const router = require("express").Router();
const { penduduk } = require("../controllers");

// Ambil semua data penduduk
router.get("/", penduduk.getAllBooks);


// Tambah data penduduk
router.get("/add", penduduk.formAddBook);
router.post("/add", penduduk.addBook);

// Ambil data penduduk berdasarkan ID
router.get("/:id", penduduk.getBookById);


// edit data penduduk
router.get("/edit/:id", penduduk.formEdit);
router.post("/edit", penduduk.editBook);

// hapus data penduduk
router.get("/delete/:id", penduduk.deleteBook);

module.exports = router;