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
});
