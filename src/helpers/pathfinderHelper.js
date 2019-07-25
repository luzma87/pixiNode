const getDistance = (start, end) => {
  const dx = Math.abs(end.x - start.x);
  const dy = Math.abs(end.y - start.y);
  if (dx > dy) {
    return 14 * dy + 10 * (dx - dy);
  }
  return 14 * dx + 10 * (dy - dx);
};

const pathfinderHelper = {
  getDistance
};

export default pathfinderHelper;
