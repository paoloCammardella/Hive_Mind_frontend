export interface Idea {
  _id: string;
  title: string;
  text: string;
  user: string;
  downvote: number;
  upvote: number;
  updatedAt: Date;
  createdAt: Date;
  userUpvoted?: boolean;
  userDownvoted?: boolean;
}


export interface LikeIdea {
  user_id: string,
  idea_id: string,
  upVote: boolean,
  downVote: boolean
}