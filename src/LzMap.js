import * as PIXI from 'pixi.js';
import positionHelper from "./helpers/positionHelper";
import LzMapTile from "./LzMapTile";

class LzMap {
  constructor(stage, map) {
    this.container = new PIXI.Container();
    this.tilesMap = map;

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
}

export default LzMap;
