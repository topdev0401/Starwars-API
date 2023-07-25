const { fetchStarshipsForLukeSkywalker } = require("../services/starwars-service");
const { handleError } = require("../utils/handleError");

const getStarshipsForLukeSkywalker = async (req, res) => {
  try {
    const starships = await fetchStarshipsForLukeSkywalker();
    res.json({
      status_code: 200,
      starships
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getStarshipsForLukeSkywalker,
};
