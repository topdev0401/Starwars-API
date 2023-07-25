const speciesController = require('../src/controllers/species-controllers');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Mock instance
const mock = new MockAdapter(axios);

const mockEpisodeResponse = {
  title: 'A New Hope',
  species: [
    'https://swapi.dev/api/species/1/',
    'https://swapi.dev/api/species/2/',
  ],
};

const mockSpeciesResponses = [
  { classification: 'mammal', name: 'Human' },
  { classification: 'mammal', name: 'Tauntaun' },
];

// Mock API endpoints
mock.onGet('https://swapi.dev/api/films/1').reply(200, mockEpisodeResponse);
mock.onGet('https://swapi.dev/api/species/1/').reply(200, mockSpeciesResponses[0]);
mock.onGet('https://swapi.dev/api/species/2/').reply(200, mockSpeciesResponses[1]);

describe("Species Controller - getClassificationForSpeciesInEpisode", () => {
  it("should return the classification of all species in the 1st episode", async () => {
    const req = { params: { episodeId: 1 } }
    const res = { json: jest.fn(), status: () => ({ json: () => {} }) }

    await speciesController.getClassificationForSpeciesInEpisode(req, res);

    // Extract the expected classification values from the mock response
    const expectedClassifications = mockSpeciesResponses.map(
      (speciesResponse) => speciesResponse.classification
    );

    expect(res.json).toHaveBeenCalledWith({
      status_code: 200,
      "classifications": expectedClassifications
    });
  })
})