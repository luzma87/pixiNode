import MapGenerator from "../src/MapGenerator";
import Pathfinder from "../src/Pathfinder";
import { expect } from "chai";

const makeTile = props => ({
  ...{
    walkable: true,
    movementPenalty: 0,
    speedBonus: 0,
    position: {x: 0, y: 0},
  },
  ...props
});

describe('Pathfinder', () => {
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
      pathfinder = new Pathfinder(start, end, tilesMap);
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

      const neighbors = pathfinder.getNeighbors(tile);

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

      const neighbors = pathfinder.getNeighbors(tile);

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

      const neighbors = pathfinder.getNeighbors(tile);

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

      const neighbors = pathfinder.getNeighbors(tile);

      expect(neighbors).to.have.deep.members(expectedNeighbors);
    });

    it('gets neighbors correctly', () => {
      start = {x: 0, y: 0};
      end = {x: 1, y: 0};
      const idsMap = [
        [0, 0],
      ];
      tilesMap = new MapGenerator().getTilesMap(idsMap);
      pathfinder = new Pathfinder(start, end, tilesMap);

      const tile = tilesMap[0][0];

      const expectedNeighbors = [
        tilesMap[0][1]
      ];

      const neighbors = pathfinder.getNeighbors(tile);

      expect(neighbors).to.have.deep.members(expectedNeighbors);
    });
  });

  describe('getNextTile',() => {

  });

  describe('calculate path', () => {
    it('works', () => {
      const start = {x: 0, y: 0};
      const end = {x: 0, y: 1};
      const tilesMap = [
        [makeTile({position: {x: 0, y: 0}}), makeTile({position: {x: 0, y: 1}})]
      ];

      const pathfinder = new Pathfinder(start, end, tilesMap);
      const finalTile = pathfinder.calculatePath();

      const expected = {
        fCost: 10,
        gCost: 10,
        hCost: 0,
        movementPenalty: 0,
        parent: {
          fCost: 10,
          gCost: 0,
          hCost: 10,
          movementPenalty: 0,
          position: {x: 0, y: 0},
          speedBonus: 0,
          walkable: true,
        },
        position: {x: 0, y: 1},
        speedBonus: 0,
        walkable: true
      };

      expect(finalTile).to.deep.equal(expected);
    });
  });
});
