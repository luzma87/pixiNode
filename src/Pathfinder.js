import { isEqual } from "lodash";
import chance from "./helpers/chance";
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

  getNextTile() {
    let sortedOpen = [...this.open];
    sortedOpen = sortedOpen.sort((a, b) => (a.fCost > b.fCost) ? 1 : ((b.fCost > a.fCost) ? -1 : 0));
    let allMins = sortedOpen.filter(el => el.fCost === sortedOpen[0].fCost);
    let currentElement = allMins[0];
    if (allMins.length > 1) {
      allMins = allMins.sort((a, b) => (a.hCost > b.hCost) ? 1 : ((b.hCost > a.hCost) ? -1 : 0));
      allMins = allMins.filter(el => el.hCost === allMins[0].hCost);
      currentElement = allMins[0];
      if (allMins.length > 1) {
        currentElement = chance.pickone(allMins);
      }
    }
    return currentElement;
  }

  getNeighbors(tile) {
    const maxX = this.tilesMap[0].length;
    const maxY = this.tilesMap.length;
    const {position: {x: tileX, y: tileY}} = tile;
    const neighbors = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) continue;
        const checkX = tileX + x;
        const checkY = tileY + y;
        if (checkX >= 0 && checkX < maxX && checkY >= 0 && checkY < maxY) {
          neighbors.push(this.tilesMap[checkY][checkX]);
        }
      }
    }
    return neighbors;
  };

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
      const currentTile = this.getNextTile();
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
      const neighbors = this.getNeighbors(currentTile);
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
