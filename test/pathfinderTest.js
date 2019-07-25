import Pathfinder from "../src/Pathfinder";
import { expect } from "chai";
import testHelper from "./testHelper";

describe('Pathfinder', () => {
  describe('calculate path', () => {
    it('works', () => {
      const start = {x: 0, y: 0};
      const end = {x: 0, y: 1};
      const tilesMap = [
        [testHelper.makeTile({position: {x: 0, y: 0}}), testHelper.makeTile({position: {x: 0, y: 1}})]
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
