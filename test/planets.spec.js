const planetsController = require('../src/controllers/planets-controller');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Mock instance
const mock = new MockAdapter(axios);

const mockResponse = {
  status_code: 200,
  results: [
    { name: 'Tatooine', population: '200000' },
    { name: 'Alderaan', population: '30000000' },
    { name: 'Hoth', population: 'unknown' },
  ]
};

// Mock API endpoint
mock.onGet('https://swapi.dev/api/planets/').reply(200, mockResponse);

describe("Planets Controller - getTotalPopulationOfPlanets", () => {
  it("should return the total population of planets", async () => {
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await planetsController.getTotalPopulationOfPlanets(req, res);

    // Calculate the expected total population from the mock response
    const expectedTotalPopulation = mockResponse.results.reduce((total, planet) => {
      return planet.population !== 'unknown'
        ? total + Number(planet.population)
        : total;
    }, 0);

    expect(res.json).toHaveBeenCalledWith({ status_code: 200, total_population: expectedTotalPopulation });
  })

  it('should handle API errors gracefully', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate an error response from the Star Wars API
    mock.onGet('https://swapi.dev/api/planets/').reply(404);

    await planetsController.getTotalPopulationOfPlanets(req, res);

    // Assert that the function returns an error response
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalled();
  });
})