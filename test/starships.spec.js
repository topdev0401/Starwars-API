const starshipsController = require('../src/controllers/starships-controller');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Mock instance
const mock = new MockAdapter(axios);

const mockResponse = {
  status_code: 200,
  starships: [
    { name: 'X-wing', model: 'T-65 X-wing', crew: '1', passengers: '0' },
    { name: 'Millennium Falcon', model: 'YT-1300 light freighter', crew: '4', passengers: '6' },
  ]
};

// Mock API endpoints
mock.onGet('https://swapi.dev/api/people/1').reply(200, { starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'] });
mock.onGet('https://swapi.dev/api/starships/12/').reply(200, mockResponse.starships[0]);
mock.onGet('https://swapi.dev/api/starships/22/').reply(200, mockResponse.starships[1]);

describe("Starships Controller - getStarshipsForLukeSkywalker", () => {
  it("should return an array of starships related to Luke Skywalker", async () => {
    const req = {}
    const res = { json: jest.fn(), status: () => ({ json: () => {} }) }

    await starshipsController.getStarshipsForLukeSkywalker(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResponse);
  })
})