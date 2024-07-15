export class Idea{
    private id: number;
    private title: string;
    private content: string ;
    private chips: string[];

    constructor(id: number, title: string, content: string, chips:string[] = ['Upvote', 'Downvote']){
        this.id = id;
        this.title = title;
        this.content = content;
        this.chips = chips;
    }

    getId(): number {
        return this.id;
      }
    
      getTitle(): string {
        return this.title;
      }
    
      getContent(): string {
        return this.content;
      }
    
      getChips(): string[] {
        return this.chips;
      }
    
}