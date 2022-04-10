import { Vote } from "../../ts/types/types";

export const testPostVotes = [
  {
    created_at: '2022-04-05T22:20:15.000Z',
    id: 519221,
    image_id: 'kqVScbbva',
    sub_id: '123',
    value: 1,
  },
  {
    created_at: '2022-04-05T22:20:15.000Z',
    id: 519222,
    image_id: 'kqVScbbva',
    sub_id: '123',
    value: 0,
  },
  {
    created_at: '2022-04-05T22:20:15.000Z',
    id: 519223,
    image_id: 'kqVScbbva',
    sub_id: '123',
    value: 0,
  },
] as Vote[];

export const mixedVotes = [
  {
    created_at: '2022-04-05T22:20:15.000Z',
    id: 519221,
    image_id: 'kqVScbbva',
    sub_id: '456',
    value: 1,
  },
  {
    created_at: '2022-04-05T22:20:15.000Z',
    id: 519222,
    image_id: 'kqVScbbva',
    sub_id: '123',
    value: 0,
  },
] as Vote [];