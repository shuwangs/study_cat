import { Mood } from "./Mood";

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
    switch (this.currentMood) {
      case Mood.SLEEPY:
        return "😴";
      case Mood.HAPPY:
        return "😺";
      case Mood.ANGRY:
        return "😾";
      case Mood.EXCITED:
        return "🤩";
      default:
        return "😺";
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