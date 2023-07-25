const { fetchTotalPopulationOfPlanets } = require("../services/starwars-service");
const { handleError } = require("../utils/handleError");

const getTotalPopulationOfPlanets = async (req, res) => {
  try {
    const totalPopulation = await fetchTotalPopulationOfPlanets();
    res.json({
      status_code: 200,
      total_population: totalPopulation,
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getTotalPopulationOfPlanets,
};
