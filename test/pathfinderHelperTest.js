import { expect } from "chai";
import pathfinderHelper from "../src/helpers/pathfinderHelper";

describe('distanceHelper', () => {
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
});
