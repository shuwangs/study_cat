import { Mood } from "./Mood.js";

export class Cat {
  id: string;
  name: string;
  currentMood: Mood;
  price: number;
  isUnlocked: boolean;
  isDefaultCat: boolean;

    constructor(id = `01`, name = "Bobo", currentMood = Mood.SLEEPY, price = 0, 
      isUnlocked = false, isDefaultCat = true) {
      this.id = id;
      this.name = name;
      this.currentMood = currentMood;
      this.price = price;
      this.isUnlocked = isUnlocked;
      this.isDefaultCat = isDefaultCat;
    }


  // Getters
  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getMood(): Mood {
    return this.currentMood;
  }
  getPrice(): number {
    return this.price;
  }
  getIsUnlocked(): boolean {
    return this.isUnlocked;
  }
  getIsDefaultCat(): boolean {
    return this.isDefaultCat;
  }

  getMoodEmoji(): string {
    const basePath = "../images/";
    switch (this.currentMood) {
      case Mood.SLEEPY:
        return basePath + "sleepy_cat.png";
      case Mood.HAPPY:
        return basePath + "happy_cat.png";
      case Mood.ANGRY:
        return basePath + "angry_cat.png";
      case Mood.EXCITED:
        return basePath + "excited_cat.png";

      default:
        return basePath + "happy_cat.png";
    }
  }
  // Setters
  setName(name: string) {
    this.name = name;
  }
  setMood(mood: Mood) {
    this.currentMood = mood;
  }

  // Other Methods
  unlockCat() {
    this.isUnlocked = true;
  }


}