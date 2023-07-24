const router = require("express").Router();

const speciesController = require("../controllers/species-controllers");

router.get(
  "/episode/:episodeId/classifications",
  speciesController.getClassificationForSpeciesInEpisode
);

module.exports = router;
