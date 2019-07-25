import { isEqual, reverse } from "lodash";
import chance from "./chance";

const getDistance = (start, end) => {
  const dx = Math.abs(end.x - start.x);
  const dy = Math.abs(end.y - start.y);
  if (dx > dy) {
    return 14 * dy + 10 * (dx - dy);
  }
  return 14 * dx + 10 * (dy - dx);
};

const getNextTile = (openTiles) => {
  let sortedOpen = [...openTiles];
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
};

const getNeighbors = (tile, tilesMap) => {
  const maxX = tilesMap[0].length;
  const maxY = tilesMap.length;
  const {position: {x: tileX, y: tileY}} = tile;
  const neighbors = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) continue;
      const checkX = tileX + x;
      const checkY = tileY + y;
      if (checkX >= 0 && checkX < maxX && checkY >= 0 && checkY < maxY) {
        neighbors.push(tilesMap[checkY][checkX]);
      }
    }
  }
  return neighbors;
};

const makeTilesPath = (tile, startPosition) => {
  let pathTiles = [];
  pathTiles.push(tile);

  let currentTile = tile;
  while (!isEqual(currentTile.position, startPosition)) {
    if (currentTile.parent) {
      pathTiles.push(currentTile.parent);
      currentTile = currentTile.parent;
    }
  }
  pathTiles = reverse(pathTiles);
  return pathTiles;
};

const optimizePath = (pathTiles) => {
  const newPathTiles = [];
  const finalTile = pathTiles.length - 1;
  let wasNextHorizontal = false;
  let wasNextVertical = false;

  for (let index = 0; index < finalTile; index++) {
    const isFirstRound = index === 0;
    const isLastRound = index + 1 === finalTile;
    const tile = pathTiles[index];
    const nextTile = pathTiles[index + 1];
    const sameX = nextTile.position.x === tile.position.x;
    const sameY = nextTile.position.y === tile.position.y;
    const xPlus1 = nextTile.position.x === tile.position.x + 1;
    const yPlus1 = nextTile.position.y === tile.position.y + 1;
    const isNextHorizontal = sameY && xPlus1;
    const isNextVertical = sameX && yPlus1;

    console.log("--------------------------");
    console.log(tile.position, nextTile.position,
      /*{sameX, sameY, xPlus1, yPlus1, isNextHorizontal, isNextVertical, wasNextHorizontal, wasNextVertical}*/);

    if (isFirstRound) {
      console.log("first");
      newPathTiles.push(tile);
      console.log("added ", index, "total->", newPathTiles.length);
      if (isNextHorizontal || isNextVertical) {
        console.log("a) skipped ", index);
        wasNextHorizontal = isNextHorizontal;
        wasNextVertical = isNextVertical;
        continue;
      }
      console.log("a) in");
      wasNextHorizontal = isNextHorizontal;
      wasNextVertical = isNextVertical;
      newPathTiles.push(nextTile);
      console.log("added ", index, "total->", newPathTiles.length);
      continue;
    }
    console.log("next");
    if (!isLastRound && (isNextHorizontal || isNextVertical)) {
      console.log("AQUI", {isNextHorizontal, isNextVertical, wasNextHorizontal, wasNextVertical});
      if (isNextHorizontal !== wasNextHorizontal || isNextVertical !== wasNextVertical) {
        console.log("c) in");
        wasNextHorizontal = isNextHorizontal;
        wasNextVertical = isNextVertical;
        newPathTiles.push(nextTile);
        console.log("added ", index, "total->", newPathTiles.length);
        continue;
      }
      wasNextHorizontal = isNextHorizontal;
      wasNextVertical = isNextVertical;
      console.log("b) skipped ", index);
      continue;
    }
    console.log("b) in");
    wasNextHorizontal = isNextHorizontal;
    wasNextVertical = isNextVertical;
    newPathTiles.push(nextTile);
    console.log("added ", index, "total->", newPathTiles.length);
  }
  // pathTiles.forEach((tile, index) => {
  // const {position: {x, y}} = tile;
  // if (x !== lastX && y !== lastY) {
  //   console.log(1);
  //   if (index > 0) {
  //     console.log(2);
  //     newPathTiles.push(pathTiles[index - 1]);
  //   }
  //   newPathTiles.push(tile);
  // } else if (index === finalTile) {
  //   console.log(3);
  //   newPathTiles.push(tile);
  // }
  // if (lastX !== x || lastY !== y) {
  //   console.log(4);
  //   lastX = x;
  //   lastY = y;
  // }
  // console.log(">>>");
  // console.log(newPathTiles);
  // console.log("=======================");
  // });
  return newPathTiles;
};

const pathfinderHelper = {
  getDistance,
  getNextTile,
  getNeighbors,
  makeTilesPath,
  optimizePath,
};

export default pathfinderHelper;
