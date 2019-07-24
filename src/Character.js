import * as PIXI from 'pixi.js';
import chance from "./helpers/chance"
import charactersHelper from "./helpers/charactersHelper";
import constants from "./helpers/constants";
import positionHelper from "./helpers/positionHelper";

class Character {
  constructor(stage, type, position, tilesMap, spawned, onCharacterClick, onCharacterDead) {
    this.container = new PIXI.Container();
    this.aStarContainer = new PIXI.Container();
    this.position = position;
    this.id = chance.guid();
    this.spriteName = type.sprite;
    this.type = type;
    this.gender = chance.gender();
    this.name = chance.first({gender: this.gender});
    this.spawned = spawned;
    this.died = {};
    this.despawnTime = {};
    this.lifespan = {
      days: chance.integer({min: type.lifespan.min, max: type.lifespan.max}),
      hours: chance.integer({min: 0, max: constants.hoursInDay - 1})
    };
    this.size = chance.integer({min: type.size.min, max: type.size.max}),
      this.selected = false;
    this.facing = "front";
    this.action = charactersHelper.actions.IDLE;
    this.prevAction = charactersHelper.actions.IDLE;
    this.onCharacterDead = onCharacterDead;

    this.sprite = charactersHelper.getSprite(type, charactersHelper.actions.IDLE);

    this.resize();

    this.container.addChild(this.sprite);
    stage.addChild(this.container);
  }

  resize() {
    const size = {
      w: constants.tileWidth * this.size,
      h: constants.tileHeight * this.size,
    };
    const originalW = this.sprite.width;
    const originalH = this.sprite.height;
    let newW, newH;
    if (originalW > originalH) {
      newW = size.w;
      newH = originalH * newW / originalW;
    } else {
      newH = size.h;
      newW = originalW * newH / originalH;
    }
    this.sprite.width = newW;
    this.sprite.height = newH;

    const spaceH = constants.tileWidth - this.sprite.width;
    const spaceV = constants.tileHeight - this.sprite.height;

    const x = (positionHelper.indexToPxH(this.position.x)) + spaceH / 2;
    const y = (positionHelper.indexToPxV(this.position.y)) + spaceV / 2;

    this.sprite.x = x;
    this.sprite.y = y;
  }

  select() {

  }

  unselect() {

  }

  update() {

  }
}

export default Character;
