const { fetchStarshipsForLukeSkywalker } = require("../services/starwars-service");
const { handleError } = require("../utils/handleError");

const getStarshipsForLukeSkywalker = async (req, res) => {
  try {
    const starships = await fetchStarshipsForLukeSkywalker();
    res.status(200).json(starships);
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getStarshipsForLukeSkywalker,
};
