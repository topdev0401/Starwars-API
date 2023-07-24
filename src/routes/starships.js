const router = require("express").Router();

const starshipsController = require("../controllers/starships-controller");

router.get("/luke-skywalker", starshipsController.getStarshipsForLukeSkywalker);

module.exports = router;
