import * as PIXI from 'pixi.js';
import grassJson from "../../assets/tiles/grass";
import grassPng from "../../assets/tiles/grass.png";

let baseTexture = PIXI.BaseTexture.from(grassPng);
let spritesheet = new PIXI.Spritesheet(baseTexture, grassJson);

spritesheet.parse(() => {
});

const getSprite = name => new PIXI.Sprite(spritesheet.textures[name]);

const tilesHelper = {
  getSprite
};

export default tilesHelper;
