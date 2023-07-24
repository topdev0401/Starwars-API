const { fetchTotalPopulationOfPlanets } = require("../services/starwars-service");
const { handleError } = require("../utils/handleError");

const getTotalPopulationOfPlanets = async (req, res) => {
  try {
    const totalPopulation = await fetchTotalPopulationOfPlanets();
    res.status(200).json(totalPopulation);
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getTotalPopulationOfPlanets,
};
