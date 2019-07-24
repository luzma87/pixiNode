import { padStart } from "lodash";
import chance from "./helpers/chance";
import tiles from "./tiles";

class MapGenerator {
  constructor() {
    this.map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 0, 0, 0],
      [0, 0, 27, 27, 27, 27, 27, 0, 0, 27, 27, 27, 0, 27, 27, 27, 0, 0],
      [0, 0, 0, 27, 27, 27, 0, 0, 0, 0, 27, 0, 0, 0, 27, 27, 0, 0],
      [0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  getMap() {
    const tilesMap = [];
    this.map.forEach((row, rowIndex) => {
      let tilesRow = [];
      row.forEach((tileId, colIndex) => {
        const tile = {...tiles[tileId]};
        const {sequence, sprite, length} = tile;
        let randomIndex = 1;
        if (!sequence) {
          randomIndex = chance.integer({min: 1, max: length});
        }
        tile.currentSprite = `${sprite}_${padStart(randomIndex.toString(), 2, '0')}`;
        tile.position = {x: colIndex, y: rowIndex};
        tilesRow.push(tile);
      });
      tilesMap.push(tilesRow);
    });
    return tilesMap;
  }
}

export default MapGenerator;
