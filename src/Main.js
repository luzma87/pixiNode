import * as PIXI from 'pixi.js';
import constants from "./helpers/constants";
import LzMap from "./LzMap";
import SideBar from "./SideBar";
import Spawner from "./Spawner";
import elementalsPng from "../assets/characters/elementals.png";
import elementalsJson from "../assets/characters/elementals.json";

class Main {
  constructor(map) {
    const mapWidth = map[0].length;
    const mapHeight = map.length;

    const barWidth = 200;

    const width = constants.tileWidth * mapWidth;
    const sceneWidth = width + barWidth;
    const sceneHeight = constants.tileHeight * mapHeight;

    this.stage = new PIXI.Container();

    this.timer = 0;
    this.hours = 0;
    this.minutes = 0;
    this.days = 0;

    this.map = new LzMap(this.stage, map);
    this.spawner = new Spawner(this.stage, this.onCharacterClicked.bind(this));

    const sideBarProps = {
      size: {w: barWidth, h: sceneHeight},
      position: {x: width, y: 0}
    };
    this.sideBar = new SideBar(this.stage, sideBarProps);

    this.renderer = PIXI.autoDetectRenderer({
      width: sceneWidth,
      height: sceneHeight
    });
    this.renderer.view.style.border = "1px dashed purple";

    document.body.appendChild(this.renderer.view);

    this.start();
  }

  updateTime() {
    this.timer += 1;
    if (this.timer % constants.minuteLength === 0) {
      this.minutes += 1;
      this.sideBar.setMinutes(this.minutes);
      if (this.minutes % 60 === 0) {
        this.hours += 1;
        this.minutes = 0;
        this.sideBar.setMinutes(this.minutes);
        this.sideBar.setHours(this.hours);
        if (this.hours % constants.hoursInDay === 0) {
          this.days += 1;
          this.timer = 0;
          this.hours = 0;
          this.minutes = 0;
          this.sideBar.setMinutes(this.minutes);
          this.sideBar.setHours(this.hours);
          this.sideBar.setDays(this.days);
        }
      }
    }
  }

  onCharacterClicked(character) {
    this.sideBar.setSelectedCharacter(character);
  }

  update() {
    requestAnimationFrame(this.update.bind(this));

    this.updateTime();
    this.renderer.render(this.stage);
    this.map.update();
    this.spawner.update(this.days, this.hours, this.minutes);
    this.sideBar.update();
  }

  // loadSpriteSheet() {
  //   let baseTexture = PIXI.BaseTexture.from(elementalsPng);
  //   let spritesheet = new PIXI.Spritesheet(baseTexture, elementalsJson);
  //   spritesheet.parse(() => {
  //     let textures = Object.keys(spritesheet.textures).map((t) => {
  //       return spritesheet.textures[t]
  //     });
  //     let animatedSprite = new PIXI.AnimatedSprite(textures);
  //     animatedSprite.animationSpeed = 0.25;
  //     animatedSprite.x = 100;
  //     animatedSprite.y = 100;
  //     animatedSprite.play();
  //     this.stage.addChild(animatedSprite);
  //   });

  start() {
    requestAnimationFrame(this.update.bind(this));
    this.map.renderMap();
    this.spawner.start(this.map);
  }
}

export default Main;
