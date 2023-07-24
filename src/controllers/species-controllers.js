const { fetchClassificationForSpeciesInEpisode } = require("../services/starwars-service");
const { handleError } = require("../utils/handleError");

const getClassificationForSpeciesInEpisode = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const classifications = await fetchClassificationForSpeciesInEpisode(
      episodeId
    );
    res.status(200).json(classifications);
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getClassificationForSpeciesInEpisode,
};
