// Services for Interaction with the Star Wars API

const axios = require("axios");
const { BASE_URI } = require("../utils/constants");

/**
 * Get the information about Luke Skywalker
 */
const fetchLukeSkywalker = async () => {
  return await axios
    .get(`${BASE_URI}/people//1`)
    .then((response) => response.data);
};

/**
 * Get starships for Luke Skywalker
 */
const fetchStarshipsForLukeSkywalker = async () => {
  // Get general information about Luke Skywalker
  const lukeSkywalker = await fetchLukeSkywalker();

  const starshipsURLs = lukeSkywalker.starships;

  const starships = await Promise.all(
    starshipsURLs.map(async (starshipURL) => {
      const starshipResponse = await axios.get(starshipURL);
      return starshipResponse.data;
    })
  );

  return starships;
};

/**
 * Get Episode information
 * @param {number} episodeId Episode #.
 */
const fetchEpisode = async (episodeId) => {
  return await axios
    .get(`${BASE_URI}/films/${episodeId}`)
    .then((response) => response.data);
};

/**
 * Get all species of a given episode
 * @param {number} episodeId Episode #.
 */
const fetchClassificationForSpeciesInEpisode = async (episodeId) => {
  const episode = await fetchEpisode(episodeId);

  // Get the list of species URLs from the episode data
  const speciesURLs = episode.species;

  // Fetch information for each species URL in parallel using Promise.all
  const speciesResponses = await Promise.all(
    speciesURLs.map((url) => axios.get(url).then((response) => response.data))
  );

  // Extract the classification of each species and store it in an array
  const classifications = speciesResponses.map(
    (response) => response.classification
  );

  return classifications;
};

const fetchTotalPopulationOfPlanets = async () => {
  const planetsResponse = await axios.get(`${BASE_URI}/planets/`);

  // Get the list of planets from the response
  const planets = planetsResponse.data.results;

  // Calculate the total population of all planets
  const totalPopulation = planets.reduce(
    (sum, { population }) =>
      sum + parseInt(population === "unknown" ? 0 : population),
    0
  );

  return totalPopulation;
};

module.exports = {
  fetchLukeSkywalker,
  fetchStarshipsForLukeSkywalker,
  fetchEpisode,
  fetchClassificationForSpeciesInEpisode,
  fetchTotalPopulationOfPlanets,
};
