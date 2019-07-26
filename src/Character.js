import * as PIXI from 'pixi.js';
import * as filters from "pixi-filters";
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
    this.size = chance.integer({min: type.size.min, max: type.size.max});
    this.speed = chance.floating({min: type.speed.min, max: type.speed.max, fixed: 1});
    this.selected = false;
    this.facing = "front";
    this.action = charactersHelper.actions.IDLE;
    this.prevAction = charactersHelper.actions.IDLE;
    this.onCharacterDead = onCharacterDead;

    this.sprite = charactersHelper.getSprite(type, charactersHelper.actions.IDLE);

    this.resize();
    this.center();

    this.sprite.interactive = true;
    this.sprite.click = () => {
      onCharacterClick(this);
    };

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
  }

  center() {
    const centered = positionHelper.centerSpriteInTile(this.sprite, this.position);
    this.sprite.x = centered.x;
    this.sprite.y = centered.y;
  }

  select() {
    this.selected = true;
    this.sprite.filters = [
      new filters.GlowFilter(15, 2, 1, 0x5292f2, 1)
    ];
  }

  unselect() {
    this.selected = false;
    this.sprite.filters = [];
  }

  update() {

  }
}

export default Character;
