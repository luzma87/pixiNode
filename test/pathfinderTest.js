import Pathfinder from "../src/Pathfinder";
import { expect } from "chai";
import testHelper from "./testHelper";

describe('Pathfinder', () => {
  describe('calculate path', () => {
    it('returns the right end tile for the simplest possible path (1h)', () => {
      const start = {x: 0, y: 0};
      const end = {x: 1, y: 0};
      const tilesMap = [
        [testHelper.makeTile({position: {x: 0, y: 0}}), testHelper.makeTile({position: {x: 1, y: 0}})]
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
        position: {x: 1, y: 0},
        speedBonus: 0,
        walkable: true
      };

      expect(finalTile).to.deep.equal(expected);
    });

    it('returns the right end tile for the simplest possible path (1d)', () => {
      const start = {x: 0, y: 0};
      const end = {x: 1, y: 1};
      const tilesMap = [
        [testHelper.makeTile({position: {x: 0, y: 0}}), testHelper.makeTile({position: {x: 1, y: 0}})],
        [testHelper.makeTile({position: {x: 0, y: 1}}), testHelper.makeTile({position: {x: 1, y: 1}})],
      ];

      const pathfinder = new Pathfinder(start, end, tilesMap);
      const finalTile = pathfinder.calculatePath();

      const expected = {
        fCost: 14,
        gCost: 14,
        hCost: 0,
        movementPenalty: 0,
        parent: {
          fCost: 14,
          gCost: 0,
          hCost: 14,
          movementPenalty: 0,
          position: {x: 0, y: 0},
          speedBonus: 0,
          walkable: true,
        },
        position: {x: 1, y: 1},
        speedBonus: 0,
        walkable: true
      };

      expect(finalTile).to.deep.equal(expected);
    });

    it('returns the right end tile for the simplest possible path (2h)', () => {
      const start = {x: 0, y: 0};
      const end = {x: 2, y: 0};
      const tilesMap = [
        [testHelper.makeTile({position: {x: 0, y: 0}}), testHelper.makeTile({position: {x: 1, y: 0}}), testHelper.makeTile({position: {x: 2, y: 0}})]
      ];

      const pathfinder = new Pathfinder(start, end, tilesMap);
      const finalTile = pathfinder.calculatePath();

      const expected = {
        fCost: 20,
        gCost: 20,
        hCost: 0,
        movementPenalty: 0,
        position: {x: 2, y: 0},
        speedBonus: 0,
        walkable: true,
        parent: {
          fCost: 20,
          gCost: 10,
          hCost: 10,
          movementPenalty: 0,
          position: {x: 1, y: 0},
          speedBonus: 0,
          walkable: true,
          parent: {
            fCost: 20,
            gCost: 0,
            hCost: 20,
            movementPenalty: 0,
            position: {x: 0, y: 0},
            speedBonus: 0,
            walkable: true,
          },
        },
      };

      expect(finalTile).to.deep.equal(expected);
    });
  });
});
