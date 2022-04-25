export interface Post {
  filter(arg0: (person: any) => any);
  _id: string;
  _createdAt: string;
  title: string;

  author: {
    name: string;
    image: string;
    bio: string;
  };
  comments: Comment[];

  description: string;

  mainImage: {
    assest: {
      url: string;
    };
  };
  userImage: {
    assest: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
}

export interface Comment {
  userImage: {
    assest: {
      url: string;
    };
  };
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  likes: number;
  last: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updateAt: string;
}
