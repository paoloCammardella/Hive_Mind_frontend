export class Idea {
  private _id: string;
  private title: string;
  private text: string;
  private chips: string[];
  private downvote: number;
  private upvote: number;
  private updatedAt: Date;
  private createdAt: Date;

  constructor(id: string, title: string, content: string, chips: string[] = ['Upvote', 'Downvote']) {
    this._id = id;
    this.title = title;
    this.text = content;
    this.chips = chips;
    this.createdAt = this.updatedAt = new Date;
    this.upvote = this.downvote = 0;
  }

   get getId(): string {
    return this._id;
  }

  get getTitle(): string {
    return this.title;
  }

  get getContent(): string {
    return this.text;
  }

   get getChips(): string[] {
    return this.chips;
  }

}