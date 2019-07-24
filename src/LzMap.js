import { padStart } from "lodash";
import * as PIXI from 'pixi.js';
import positionHelper from "./helpers/positionHelper";
import LzMapTile from "./LzMapTile";
import tiles from "./tiles";
import chance from "./helpers/chance"

class LzMap {
  constructor(stage, map) {
    this.container = new PIXI.Container();
    this.tilesMap = this.makeTilesMap(map);

    stage.addChild(this.container);
  }

  renderMap() {
    let rowPosition = 0;
    let colPosition = 0;
    this.tilesMap.forEach((row, rowIndex) => {
      rowPosition = positionHelper.indexToPxV(rowIndex);
      row.forEach((tile, colIndex) => {
        colPosition = positionHelper.indexToPxH(colIndex);
        new LzMapTile(this.container, tile);
      })
    });
  }

  update() {

  }

  makeTilesMap(idsMap) {
    const tilesMap = [];
    idsMap.forEach((row, rowIndex) => {
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

export default LzMap;
