export interface Idea{
  _id: string;
  title: string;
  text: string;
  downvote: number;
  upvote: number;
  updatedAt: Date;
  createdAt: Date;
}