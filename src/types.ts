export type PostMeta = {
  title: string;
  description?: string;
  posted: Date;
};

export type Post = {
  link: string;
  module: {
    default: React.ComponentType;
    meta: PostMeta;
  };
};
