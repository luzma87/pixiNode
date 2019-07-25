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

const pathfinderHelper = {
  getDistance,
  getNextTile,
  getNeighbors,
};

export default pathfinderHelper;
