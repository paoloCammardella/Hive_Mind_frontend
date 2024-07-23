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

export interface ContentResponse<T> {
  content: T[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalElements: number; 
}

export interface LikeIdea {
  user_id: string,
  idea_id: string,
  upVote: boolean,
  downVote: boolean
}