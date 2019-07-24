import * as PIXI from 'pixi.js';
import Character  from "./Character";
import charactersHelper from "./helpers/charactersHelper";
import positionHelper from "./helpers/positionHelper";

class Spawner {
  constructor(stage, onCharacterClicked) {
    this.container = new PIXI.Container();
    this.onCharacterClickedFromMain = onCharacterClicked;

    this.maxChars = 10;
    this.characters = [];

    this.days = 0;
    this.hours = 0;
    this.minutes = 0;

    this.stats = [];

    stage.addChild(this.container);
  }

  onCharacterClick(character) {
    this.characters.forEach(char => {
      char.unselect();
    });
    character.select();

    this.onCharacterClickedFromMain(character);
  }

  onCharacterDead(character) {
    this.container.removeChild(character.sprite);
    this.characters = this.characters.filter(char => char.id !== character.id);
  }

  makeCharacter(type, position) {
    const spawned = {
      days: this.days,
      hours: this.hours,
      minutes: this.minutes
    };
    return new Character(
      this.container,
      type, position, this.tilesMap, spawned,
      this.onCharacterClick.bind(this),
      this.onCharacterDead.bind(this)
    );
  }

  spawnCharacter(tile, position) {
    if (tile.walkable) {
      let rand = Math.random();
      if (rand <= charactersHelper.types.grass.chance) {
        return this.makeCharacter(charactersHelper.types.grass, position);
      } else {
        rand = Math.random();
        if (rand <= charactersHelper.types.fire.chance) {
          return this.makeCharacter(charactersHelper.types.fire, position);
        }
      }
    }
    return undefined;
  }

  start(map) {
    this.tilesMap = map.tilesMap;
    let rowPosition = 0;
    let colPosition = 0;
    this.tilesMap.forEach((row, rowIndex) => {
      rowPosition = positionHelper.indexToPxV(rowIndex);
      row.forEach((tile, colIndex) => {
        colPosition = positionHelper.indexToPxH(colIndex);
        if (this.characters.length < this.maxChars) {
          const char = this.spawnCharacter(tile, {x: colIndex, y: rowIndex});
          if (char) {
            this.characters.push(char);
            this.stats.push(char);
          }
        }
      })
    });
  }

  update(days, hours, minutes) {
    this.characters.forEach(char => {
      char.update(days, hours, minutes);
    });
  }

}

export default Spawner;
