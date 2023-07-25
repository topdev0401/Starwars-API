const router = require("express").Router();

const planetsController = require("../controllers/planets-controller");

router.get(
  "/total-population",
  planetsController.getTotalPopulationOfPlanets
);

module.exports = router;
