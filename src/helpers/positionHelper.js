import constants from "./constants";

const indexToPx = (index, multiplier) => index * multiplier;
const indexToPxH = index => indexToPx(index, constants.tileWidth);
const indexToPxV = index => indexToPx(index, constants.tileHeight);

const positionHelper = {
  indexToPxH,
  indexToPxV,
};

export default positionHelper;
