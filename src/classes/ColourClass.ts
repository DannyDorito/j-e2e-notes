export class ColourClass {
  backgroundColour: string;
  accentColour: string;
  isCustom: boolean;

  constructor(backgroundColour: string, textColour: string, isCustom: boolean) {
    this.backgroundColour = backgroundColour;
    this.accentColour = textColour;
    this.isCustom = isCustom;
  }
}
