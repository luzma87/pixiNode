import * as PIXI from 'pixi.js';
import chance from "./helpers/chance"
import constants from "./helpers/constants";
import positionHelper from "./helpers/positionHelper";
import tilesHelper from "./helpers/tilesHelper";

class LzMapTile {
  constructor(stage, tile) {
    this.container = new PIXI.Container();
    this.tile = tile;

    const {currentSprite, position} = this.tile;

    this.sprite = tilesHelper.getSprite(currentSprite);
    this.sprite.x = positionHelper.indexToPxH(position.x);
    this.sprite.y = positionHelper.indexToPxV(position.y);
    this.flip();
    this.rotate();
    this.sprite.width = constants.tileWidth;
    this.sprite.height = constants.tileHeight;
    this.container.addChild(this.sprite);

    stage.addChild(this.container);
  }

  flip() {
    const {flip} = this.tile;
    const flipped = chance.pickone(flip);
    if (flipped.includes('v')) {
      this.sprite.anchor.y = 1;
      this.sprite.scale.y = -1;
    }
    if (flipped.includes('h')) {
      this.sprite.anchor.x = 1;
      this.sprite.scale.x = -1;
    }
  }

  rotate() {
    const {rotate} = this.tile;
    const rotation = chance.pickone(rotate);
    const rotationRadians = rotation * Math.PI / 180;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.rotation = rotationRadians;
    this.sprite.x += constants.tileWidth / 2;
    this.sprite.y += constants.tileHeight / 2;
  }
}

export default LzMapTile;
