export type Post = {
  height: number;
  id: string;
  url: string;
  width: number;
  favourite_id?: string;
};

export type Favourite = {
  created_at: string;
  id: number;
  image: { id: string; url: string };
  image_id: string;
  sub_id?: string;
  user_id?: string;
};
