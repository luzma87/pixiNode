import constants from "./constants";

const indexToPx = (index, multiplier) => index * multiplier;
const indexToPxH = index => indexToPx(index, constants.tileWidth);
const indexToPxV = index => indexToPx(index, constants.tileHeight);

const centerSpriteInTile = (sprite, position) => {
  const spaceH = constants.tileWidth - sprite.width;
  const spaceV = constants.tileHeight - sprite.height;

  const x = (positionHelper.indexToPxH(position.x)) + spaceH / 2;
  const y = (positionHelper.indexToPxV(position.y)) + spaceV / 2;

  return {x,y};
};

const positionHelper = {
  indexToPxH,
  indexToPxV,
  centerSpriteInTile
};

export default positionHelper;
