const router = require("express").Router();
const { data } = require("../controllers");

// Ambil semua data penduduk
router.get("/", data.getAllData);

// Tambah data penduduk
router.get("/add", data.formAddData);
router.post("/add", data.addData);

// Ambil data penduduk berdasarkan ID
router.get("/:id", data.getDataById);


// edit data penduduk
router.get("/edit/:id", data.formEdit);
router.post("/edit", data.editData);

// hapus data penduduk
router.get("/delete/:id", data.deleteData);

module.exports = router;