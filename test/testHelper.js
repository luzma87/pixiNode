import chance from "../src/helpers/chance";

const makeTile = props => ({
  ...{
    walkable: true,
    movementPenalty: 0,
    speedBonus: 0,
    position: {x: chance.integer({min: 0, max: 20}), y: chance.integer({min: 0, max: 20})},
  },
  ...props
});

const testHelper = {
  makeTile
};

export default testHelper;
