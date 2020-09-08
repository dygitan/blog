import { StoreObject } from '@apollo/client';

export enum Status {
  ACTIVE = 'ACTIVE',
  ARCHIVE = 'ARCHIVE',
}

interface CommonFields extends StoreObject {
  __typename: string;
  id: string;
  createdAt: Date;
  owner: string;
}

export interface Comment extends CommonFields {
  content: string;
}

export interface Post extends CommonFields {
  title: string;
  description: string;
  status: Status;
  comments: {
    items: Comment[];
  };
}

export type ListPostsResponse = {
  __typename: string;
  listPostsByStatus: {
    items: Post[];
  };
};

export type ListPosts = {
  items: Post[];
};

export type CreatePostResponse = {
  __typename: string;
  createPost: Post;
};
