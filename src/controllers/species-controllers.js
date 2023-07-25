const { fetchClassificationForSpeciesInEpisode } = require("../services/starwars-service");
const { handleError } = require("../utils/handleError");

const getClassificationForSpeciesInEpisode = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const classifications = await fetchClassificationForSpeciesInEpisode(
      episodeId
    );
    res.json({
      status_code: 200,
      classifications
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getClassificationForSpeciesInEpisode,
};
