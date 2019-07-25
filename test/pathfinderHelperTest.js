import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chance from "../src/helpers/chance";
import pathfinderHelper from "../src/helpers/pathfinderHelper";
import MapGenerator from "../src/MapGenerator";
import testHelper from "./testHelper";

chai.use(sinonChai);

describe('pathfinderHelper', () => {
  describe('getDistance', () => {
    describe('returns 10 for orthogonal', () => {
      it('1,1 and 2,1', () => {
        const start = {x: 1, y: 1};
        const end = {x: 2, y: 1};
        const distance = pathfinderHelper.getDistance(start, end);
        expect(distance).to.equal(10);
      });
      it('1,1 and 0,1', () => {
        const start = {x: 1, y: 1};
        const end = {x: 0, y: 1};
        const distance = pathfinderHelper.getDistance(start, end);
        expect(distance).to.equal(10);
      });
      it('1,1 and 1,0', () => {
        const start = {x: 1, y: 1};
        const end = {x: 1, y: 0};
        const distance = pathfinderHelper.getDistance(start, end);
        expect(distance).to.equal(10);
      });
      it('1,1 and 1,2', () => {
        const start = {x: 1, y: 1};
        const end = {x: 1, y: 2};
        const distance = pathfinderHelper.getDistance(start, end);
        expect(distance).to.equal(10);
      });
    });

    describe('returns 14 for diagonal', () => {
      it('1,1 and 0,0', () => {
        const start = {x: 1, y: 1};
        const end = {x: 0, y: 0};
        const distance = pathfinderHelper.getDistance(start, end);
        expect(distance).to.equal(14);
      });
      it('1,1 and 0,2', () => {
        const start = {x: 1, y: 1};
        const end = {x: 0, y: 2};
        const distance = pathfinderHelper.getDistance(start, end);
        expect(distance).to.equal(14);
      });
      it('1,1 and 0,2', () => {
        const start = {x: 1, y: 1};
        const end = {x: 0, y: 2};
        const distance = pathfinderHelper.getDistance(start, end);
        expect(distance).to.equal(14);
      });
      it('1,1 and 2,2', () => {
        const start = {x: 1, y: 1};
        const end = {x: 2, y: 2};
        const distance = pathfinderHelper.getDistance(start, end);
        expect(distance).to.equal(14);
      });
    });

  });

  describe('getNeighbors', () => {
    let start, end, tilesMap, pathfinder;

    beforeEach(() => {
      start = {x: 0, y: 0};
      end = {x: 1, y: 0};
      const idsMap = [
        [0, 0, 0,],
        [0, 0, 0,],
        [0, 0, 0,],
      ];
      tilesMap = new MapGenerator().getTilesMap(idsMap);
    });

    it('finds all 8 existing neighbors for 1,1', () => {
      const tile = tilesMap[1][1];

      const expectedNeighbors = [
        tilesMap[0][0],
        tilesMap[0][1],
        tilesMap[0][2],
        tilesMap[1][0],
        tilesMap[1][2],
        tilesMap[2][0],
        tilesMap[2][1],
        tilesMap[2][2],
      ];

      const neighbors = pathfinderHelper.getNeighbors(tile, tilesMap);

      expect(neighbors).to.have.lengthOf(8);
      expect(neighbors).to.have.deep.members(expectedNeighbors);
    });

    it('finds the 3 existing neighbors for 0,0', () => {
      const tile = tilesMap[0][0];

      const expectedNeighbors = [
        tilesMap[0][1],
        tilesMap[1][1],
        tilesMap[1][0],
      ];

      const neighbors = pathfinderHelper.getNeighbors(tile, tilesMap);

      expect(neighbors).to.have.deep.members(expectedNeighbors);
    });

    it('finds the 5 existing neighbors for 1,0', () => {
      const tile = tilesMap[1][0];

      const expectedNeighbors = [
        tilesMap[0][0],
        tilesMap[2][0],
        tilesMap[0][1],
        tilesMap[1][1],
        tilesMap[2][1],
      ];

      const neighbors = pathfinderHelper.getNeighbors(tile, tilesMap);

      expect(neighbors).to.have.deep.members(expectedNeighbors);
    });

    it('finds the 5 existing neighbors for 0,1', () => {
      const tile = tilesMap[0][1];

      const expectedNeighbors = [
        tilesMap[0][0],
        tilesMap[0][2],
        tilesMap[1][0],
        tilesMap[1][1],
        tilesMap[1][2],
      ];

      const neighbors = pathfinderHelper.getNeighbors(tile, tilesMap);

      expect(neighbors).to.have.deep.members(expectedNeighbors);
    });

    it('gets neighbors correctly', () => {
      start = {x: 0, y: 0};
      end = {x: 1, y: 0};
      const idsMap = [
        [0, 0],
      ];
      tilesMap = new MapGenerator().getTilesMap(idsMap);

      const tile = tilesMap[0][0];

      const expectedNeighbors = [
        tilesMap[0][1]
      ];

      const neighbors = pathfinderHelper.getNeighbors(tile, tilesMap);

      expect(neighbors).to.have.deep.members(expectedNeighbors);
    });
  });

  describe('getNextTile', () => {
    it('returns the tile with lowest fCost when they are all different', () => {
      const expectedNextTile = testHelper.makeTile({fCost: 10});
      const openTiles = [
        testHelper.makeTile({fCost: 20}),
        testHelper.makeTile({fCost: 28}),
        expectedNextTile,
        testHelper.makeTile({fCost: 30}),
      ];

      const nextTile = pathfinderHelper.getNextTile(openTiles);

      expect(nextTile).to.deep.equal(expectedNextTile);
    });

    it('returns the tile with lowest hCost in case of a tie of fCosts', () => {
      const expectedNextTile = testHelper.makeTile({fCost: 10, hCost: 14});
      const openTiles = [
        testHelper.makeTile({fCost: 10, hCost: 28}),
        testHelper.makeTile({fCost: 14}),
        expectedNextTile,
        testHelper.makeTile({fCost: 30}),
      ];

      const nextTile = pathfinderHelper.getNextTile(openTiles);

      expect(nextTile).to.deep.equal(expectedNextTile);
    });

    it('returns a random tile in case of a tie of fCosts and hCosts', () => {
      let localSandbox = sinon.createSandbox();

      const expectedNextTile = testHelper.makeTile({fCost: 10, hCost: 14});

      localSandbox
        .stub(chance, "pickone")
        .returns(expectedNextTile);

      const openTiles = [
        testHelper.makeTile({fCost: 10, hCost: 14}),
        testHelper.makeTile({fCost: 14}),
        expectedNextTile,
        testHelper.makeTile({fCost: 30}),
      ];

      const nextTile = pathfinderHelper.getNextTile(openTiles);

      expect(nextTile).to.deep.equal(expectedNextTile);

      localSandbox.restore();
    });
  });

  describe('makeTilesPath', () => {
    it('returns the tile when it has no parent', () => {
      const tile = testHelper.makeTile();
      const startPosition = tile.position;

      const pathTiles = pathfinderHelper.makeTilesPath(tile, startPosition);

      expect(pathTiles).to.have.lengthOf(1);
      expect(pathTiles).to.have.deep.members([tile]);
    });

    it('returns the tile and its parent in reverse order', () => {
      const parentPosition = {x: 0, y: 0};
      const tilePosition = {x: 0, y: 1};
      const parent = testHelper.makeTile({position: parentPosition});
      const tile = testHelper.makeTile({parent, position: tilePosition});

      const pathTiles = pathfinderHelper.makeTilesPath(tile, parentPosition);

      expect(pathTiles).to.have.lengthOf(2);
      expect(pathTiles).to.have.deep.ordered.members([parent, tile]);
    });

    it('returns the tile and its successive parents in reverse order', () => {
      const parent1Position = {x: 0, y: 0};
      const parent2Position = {x: 1, y: 0};
      const parent3Position = {x: 2, y: 0};
      const tilePosition = {x: 3, y: 0};
      const parent1 = testHelper.makeTile({position: parent1Position});
      const parent2 = testHelper.makeTile({parent: parent1, position: parent2Position});
      const parent3 = testHelper.makeTile({parent: parent2, position: parent3Position});
      const tile = testHelper.makeTile({parent: parent3, position: tilePosition});

      const pathTiles = pathfinderHelper.makeTilesPath(tile, parent1Position);

      expect(pathTiles).to.have.lengthOf(4);
      expect(pathTiles).to.have.deep.ordered.members([parent1, parent2, parent3, tile]);
    });
  });

  describe('optimizePath', () => {
    it('returns the first and last tiles when they are in a vertical line', () => {
      const tile1 = testHelper.makeTile({position: {x: 0, y: 0}});
      const tile2 = testHelper.makeTile({position: {x: 0, y: 1}});
      const tile3 = testHelper.makeTile({position: {x: 0, y: 2}});
      const tile4 = testHelper.makeTile({position: {x: 0, y: 3}});
      const tilePath = [tile1, tile2, tile3, tile4];
      const expectedPath = [tile1, tile4];

      const optimizedPath = pathfinderHelper.optimizePath(tilePath);

      expect(optimizedPath).to.have.lengthOf(2);
      expect(optimizedPath).to.have.deep.ordered.members(expectedPath);
    });

    it('returns the first and last tiles when they are in a horizontal line', () => {
      const tile1 = testHelper.makeTile({position: {x: 0, y: 0}});
      const tile2 = testHelper.makeTile({position: {x: 1, y: 0}});
      const tile3 = testHelper.makeTile({position: {x: 2, y: 0}});
      const tile4 = testHelper.makeTile({position: {x: 3, y: 0}});
      const tilePath = [tile1, tile2, tile3, tile4];
      const expectedPath = [tile1, tile4];

      const optimizedPath = pathfinderHelper.optimizePath(tilePath);

      expect(optimizedPath).to.have.lengthOf(2);
      expect(optimizedPath).to.have.deep.ordered.members(expectedPath);
    });

    it('returns the first and last tiles when they are in a diagonal line', () => {
      const tile1 = testHelper.makeTile({position: {x: 0, y: 0}});
      const tile2 = testHelper.makeTile({position: {x: 1, y: 1}});
      const tile3 = testHelper.makeTile({position: {x: 2, y: 2}});
      const tile4 = testHelper.makeTile({position: {x: 3, y: 3}});
      const tilePath = [tile1, tile2, tile3, tile4];
      const expectedPath = [tile1, tile4];

      const optimizedPath = pathfinderHelper.optimizePath(tilePath);

      expect(optimizedPath).to.have.lengthOf(2);
      expect(optimizedPath).to.have.deep.ordered.members(expectedPath);
    });

    it('returns the tiles where direction is changed horizontal to vertical', () => {
      const tile1 = testHelper.makeTile({position: {x: 0, y: 0}});
      const tile2 = testHelper.makeTile({position: {x: 1, y: 0}});
      const tile3 = testHelper.makeTile({position: {x: 2, y: 0}});
      const tile4 = testHelper.makeTile({position: {x: 2, y: 1}});
      const tile5 = testHelper.makeTile({position: {x: 2, y: 2}});
      const tile6 = testHelper.makeTile({position: {x: 2, y: 3}});
      const tilePath = [tile1, tile2, tile3, tile4, tile5, tile6];
      const expectedPath = [tile1, tile4, tile6];

      const optimizedPath = pathfinderHelper.optimizePath(tilePath);

      expect(optimizedPath).to.have.lengthOf(3);
      expect(optimizedPath).to.have.deep.ordered.members(expectedPath);
    });

    it('returns the tiles where direction is changed vertical to horizontal', () => {
      const tile1 = testHelper.makeTile({position: {x: 0, y: 0}});
      const tile2 = testHelper.makeTile({position: {x: 0, y: 1}});
      const tile3 = testHelper.makeTile({position: {x: 0, y: 2}});
      const tile4 = testHelper.makeTile({position: {x: 1, y: 2}});
      const tile5 = testHelper.makeTile({position: {x: 2, y: 2}});
      const tile6 = testHelper.makeTile({position: {x: 3, y: 2}});
      const tilePath = [tile1, tile2, tile3, tile4, tile5, tile6];
      const expectedPath = [tile1, tile4, tile6];

      const optimizedPath = pathfinderHelper.optimizePath(tilePath);

      expect(optimizedPath).to.have.lengthOf(3);
      expect(optimizedPath).to.have.deep.ordered.members(expectedPath);
    });

    it('returns the tiles where direction is changed vertical to diagonal', () => {
      const tile1 = testHelper.makeTile({position: {x: 0, y: 0}});
      const tile2 = testHelper.makeTile({position: {x: 0, y: 1}});
      const tile3 = testHelper.makeTile({position: {x: 0, y: 2}});
      const tile4 = testHelper.makeTile({position: {x: 1, y: 3}});
      const tile5 = testHelper.makeTile({position: {x: 2, y: 4}});
      const tile6 = testHelper.makeTile({position: {x: 3, y: 5}});
      const tilePath = [tile1, tile2, tile3, tile4, tile5, tile6];
      const expectedPath = [tile1, tile4, tile6];

      const optimizedPath = pathfinderHelper.optimizePath(tilePath);

      expect(optimizedPath).to.have.lengthOf(3);
      expect(optimizedPath).to.have.deep.ordered.members(expectedPath);
    });

    it('returns the tiles where direction is changed horizontal to diagonal', () => {
      const tile1 = testHelper.makeTile({position: {x: 0, y: 0}});
      const tile2 = testHelper.makeTile({position: {x: 1, y: 0}});
      const tile3 = testHelper.makeTile({position: {x: 2, y: 0}});
      const tile4 = testHelper.makeTile({position: {x: 3, y: 1}});
      const tile5 = testHelper.makeTile({position: {x: 4, y: 2}});
      const tile6 = testHelper.makeTile({position: {x: 5, y: 3}});
      const tilePath = [tile1, tile2, tile3, tile4, tile5, tile6];
      const expectedPath = [tile1, tile4, tile6];

      const optimizedPath = pathfinderHelper.optimizePath(tilePath);

      expect(optimizedPath).to.have.lengthOf(3);
      expect(optimizedPath).to.have.deep.ordered.members(expectedPath);
    });
  });
});
