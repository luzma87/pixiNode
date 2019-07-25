import { isEqual } from "lodash";
import pathfinderHelper from "./helpers/pathfinderHelper";

class Pathfinder {
  constructor(start, end, tilesMap) {
    this.start = start;
    this.end = end;
    this.tilesMap = tilesMap;
    this.open = [];
    this.closed = [];
    this.finalTile = undefined;
  }

  isInOpen(tile) {
    const a = this.open.filter(el => el.position.x === tile.position.x && el.position.y === tile.position.y);
    return a.length > 0;
  }

  isInClosed(tile) {
    const a = this.closed.filter(el => el.position.x === tile.position.x && el.position.y === tile.position.y);
    return a.length > 0;
  }

  calculatePath() {
    const startTile = this.tilesMap[this.start.y][this.start.x];

    const initialDistanceFromEnd = pathfinderHelper.getDistance(startTile.position, this.end);
    startTile.gCost = 0;
    startTile.hCost = initialDistanceFromEnd;
    startTile.fCost = initialDistanceFromEnd;
    this.open.push(startTile);

    let goOn = true;
    let counter = 0;

    while (goOn) {
      const currentTile = pathfinderHelper.getNextTile(this.open);
      let currentPosition = currentTile.position;
      this.open = this.open.filter(el => el.position.x !== currentPosition.x || el.position.y !== currentPosition.y);
      this.closed.push(currentTile);

      if (isEqual(currentPosition, this.end)) {
        counter += 1;
        console.log("DONE!");
        this.finalTile = {...currentTile};
        goOn = false;
        break;
      }
      const neighbors = pathfinderHelper.getNeighbors(currentTile, this.tilesMap);
      neighbors.forEach(n => {
        const {walkable} = n;
        if (walkable && !this.isInClosed(n)) {
          const {gCost} = n;
          const distanceFromEnd = pathfinderHelper.getDistance(n.position, this.end);
          const newMovementCost = pathfinderHelper.getDistance(n.position, currentTile.position) + currentTile.gCost + n.movementPenalty;
          const inOpen = this.isInOpen(n);
          if (newMovementCost < gCost || !inOpen) {
            n.gCost = newMovementCost;
            n.hCost = distanceFromEnd;
            n.fCost = newMovementCost + distanceFromEnd;
            n.parent = currentTile;
          }
          if (!inOpen) this.open.push(n);
        }
      });
      counter += 1;
    }
    return this.finalTile;
  }
}

export default Pathfinder;
