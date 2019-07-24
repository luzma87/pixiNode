import * as PIXI from 'pixi.js';
import constants from "./helpers/constants";

const labelStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 14,
  fill: "white"
});
const valueStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 14,
  fill: "#333"
});
const selectedTitleStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 18,
  fill: "#333"
});

const timeText = (hours, minutes) => {
  const nightEnded = ((hours >= constants.nightHours.end.hours) && (minutes >= constants.nightHours.end.minutes))
    || hours > constants.nightHours.end.hours;
  const nightStarted = ((hours >= constants.nightHours.start.hours) && (minutes >= constants.nightHours.start.minutes))
    || hours > constants.nightHours.start.hours;
  return nightEnded && !nightStarted ? "Daytime" : "Nighttime";
};

const formatTime = (hours, minutes) => {
  const strHours = hours.toString().padStart(2, '0');
  const strMinutes = minutes.toString().padStart(2, '0');
  return `${strHours}:${strMinutes}`;
};

class SideBar {
  constructor(stage, props) {
    const {position, size} = props;
    const {x, y} = position;

    this.position = position;
    this.size = size;
    this.container = new PIXI.Container();
    this.selectedCharacterArea = {container: new PIXI.Container()};

    this.days = 0;
    this.hours = 0;
    this.minutes = 0;

    this.drawBackground();

    this.labelX = x + 8;
    const labelY = y + 8;
    const valueY = labelY;
    this.lineHeight = 25;

    this.daysText = this.writeLine("Days:", 0, labelY);
    this.timeText = this.writeLine("Time:", 0, labelY + this.lineHeight);

    this.text = this.write({x: this.labelX, y: valueY + 2 * this.lineHeight}, timeText(this.hours, this.minutes), valueStyle);

    this.drawSelectedCharacterArea();

    stage.addChild(this.container);
  }

  drawBackground() {
    const {x, y} = this.position;
    const {w, h} = this.size;
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(0x59a7b7);
    // rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.drawRect(x, y, w, h);
    rectangle.endFill();
    this.container.addChild(rectangle);
  }

  setDays(days) {
    this.days = days;
  }

  setHours(hours) {
    this.hours = hours;
  }

  setMinutes(minutes) {
    this.minutes = minutes;
  }

  setSelectedCharacter(character) {
    this.selectedCharacterArea.name.text = character.name;
    this.selectedCharacterArea.gender.text = character.gender;
    this.selectedCharacterArea.type.text = character.type.name;
    this.selectedCharacterArea.speed.text = character.speed;
    this.selectedCharacterArea.spawned.text = `day ${character.spawned.days} ${formatTime(character.spawned.hours, character.spawned.minutes)}`;
    this.selectedCharacterArea.lifespan.text = `${character.lifespan.days}d ${character.lifespan.hours}h`

    this.container.addChild(this.selectedCharacterArea.container);
  }

  update() {
    this.daysText.text = this.days;
    this.timeText.text = formatTime(this.hours, this.minutes);
    this.text.text = timeText(this.hours, this.minutes);
  }

  drawSelectedCharacterArea() {
    const {x} = this.position;
    const {w, h} = this.size;
    const selectedCharAreaHeight = 400;
    const selectedCharAreaY = h - selectedCharAreaHeight;
    const firstTextY = selectedCharAreaY + 10;
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(0x92c2cc);
    rectangle.drawRect(x, selectedCharAreaY, w, selectedCharAreaHeight);
    rectangle.endFill();
    this.selectedCharacterArea.container.addChild(rectangle);

    const title = this.write({x: this.labelX, y: selectedCharAreaY + 8}, "Selected info", selectedTitleStyle, true);
    const name = this.writeLine("Name:", 0, firstTextY + this.lineHeight, true);
    const gender = this.writeLine("Gender:", 0, firstTextY + 2 * this.lineHeight, true);
    const type = this.writeLine("Type:", 0, firstTextY + 3 * this.lineHeight, true);
    const speed = this.writeLine("Speed:", 0, firstTextY + 4 * this.lineHeight, true);
    const spawned = this.writeLine("Spawned:", 0, firstTextY + 5 * this.lineHeight, true);
    const lifespan = this.writeLine("Lifespan:", 0, firstTextY + 6 * this.lineHeight, true);

    this.selectedCharacterArea.name = name;
    this.selectedCharacterArea.gender = gender;
    this.selectedCharacterArea.type = type;
    this.selectedCharacterArea.speed = speed;
    this.selectedCharacterArea.spawned = spawned;
    this.selectedCharacterArea.lifespan = lifespan;

    this.selectedCharacterArea.container.addChild(title);
  }

  writeLine(label, value, labelY, inSecondaryContainer) {
    const valueX = this.labelX + 65;
    const valueY = labelY;
    this.write({x: this.labelX, y: labelY}, label, labelStyle, inSecondaryContainer);
    return this.write({x: valueX, y: valueY}, value, valueStyle, inSecondaryContainer);
  }

  write(position, text, style, inSecondaryContainer) {
    const {x, y} = position;
    const message = new PIXI.Text(text, style);
    message.position.set(x, y);
    if (inSecondaryContainer) {
      this.selectedCharacterArea.container.addChild(message);
    } else {
      this.container.addChild(message);
    }
    return message;
  }
}

export default SideBar;
