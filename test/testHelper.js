const makeTile = props => ({
  ...{
    walkable: true,
    movementPenalty: 0,
    speedBonus: 0,
    position: {x: 0, y: 0},
  },
  ...props
});

const testHelper = {
  makeTile
};

export default testHelper;
