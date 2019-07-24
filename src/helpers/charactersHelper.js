import * as PIXI from 'pixi.js';
import { startsWith } from "lodash";
import elementalsJson from "../../assets/characters/elementals";
import elementalsPng from "../../assets/characters/elementals.png";

const types = {
  grass: {
    name: "Grass",
    sprite: "grass",
    speed: 0.6,
    chance: 0.05,
    size: {
      min: 0.6,
      max: 0.8
    },
    lifespan: {
      min: 1,
      max: 3
    }
  },
  fire: {
    name: "Fire",
    sprite: "fire",
    speed: 0.5,
    chance: 0.025,
    size: {
      min: 0.65,
      max: 0.85
    },
    lifespan: {
      min: 1,
      max: 3
    }
  }
};

const actions = {
  IDLE: {sprite: "idle_front", length: 1},
  WALK_FRONT: {sprite: "walk_front", length: 2},
  WALK_BACK: {sprite: "walk_back", length: 2},
  WALK_LEFT: {sprite: "walk_left", length: 2},
  WALK_RIGHT: {sprite: "walk_right", length: 2},
  DEAD: {sprite: "blob", length: 3}
};

let baseTexture = PIXI.BaseTexture.from(elementalsPng);
let spritesheet = new PIXI.Spritesheet(baseTexture, elementalsJson);

spritesheet.parse(() => {
});

const getTexturesArray = (type, action) => {
  const {sprite: typeSprite} = type;
  const {sprite: actionSprite} = action;
  const name = `${typeSprite}_${actionSprite}`;
  const textures = [];
  Object.keys(spritesheet.textures).forEach((textureName) => {
    if(startsWith(textureName, name)) {
      textures.push(spritesheet.textures[textureName]);
    }
  });
  return textures;
};

const getSprite = (type, action) => {
  const textures = getTexturesArray(type, action);
  return new PIXI.AnimatedSprite(textures);
};

const charactersHelper = {
  types,
  actions,
  getSprite
};

export default charactersHelper;
