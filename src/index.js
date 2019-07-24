import Main from "./Main";
import MapGenerator from "./MapGenerator";

const mapGenerator = new MapGenerator();
const map = mapGenerator.getMap();

new Main(map);
