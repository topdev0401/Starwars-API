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
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

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

  it('should handle API errors gracefully', async () => {
    const req = { params: { episodeId: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate an error response from the Star Wars API
    mock.onGet('https://swapi.dev/api/films/1').reply(404);

    await speciesController.getClassificationForSpeciesInEpisode(req, res);

    // Assert that the function returns an error response
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalled();
  });
})