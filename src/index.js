import Main from "./Main";
import MapGenerator from "./MapGenerator";

const mapGenerator = new MapGenerator();
const idsMap = mapGenerator.getIdsMap();
const map = mapGenerator.getTilesMap(idsMap);

new Main(map);
