import { VoteResponse, VotesResponse } from './../ts/interfaces/index';
import { setBaseHeaders } from '../utils/headers';

export const VOTES_URL = 'https://api.thecatapi.com/v1/votes';

export const vote = async (imageId: string, value: number): Promise<VoteResponse> => {
  try {
    const requestHeaders = setBaseHeaders();
    requestHeaders.set('Content-Type', 'application/json');

    const data = {
      image_id: imageId,
      sub_id: '123',
      value,
    };

    const res = await fetch(VOTES_URL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: requestHeaders,
      body: JSON.stringify(data),
    });
    console.log('res', res);
    let voteError;
    if (!res.ok) {
      throw new Error('Something went wrong');
    } else {
      voteError = null;
    }
    return { voteError }
  } catch (e) {
    console.log(e);
    const voteError = 'Something went wrong';
    return { voteError };
  }
};

export const getVotes = async (): Promise<VotesResponse> => {
  try {
    const requestHeaders = setBaseHeaders();
    const res = await fetch(VOTES_URL, {
      headers: requestHeaders,
    });
    let response;
    let votesError;
    if (!res.ok) {
      response = [];
      votesError = 'There was an error fetching votes';
    } else {
      response = await res.json();
      votesError = null;
    }
    return { response, votesError };
  } catch (error) {
    console.log(error);
    const response: [] = [];
    const votesError = 'System error when fetching votes';
    return { response, votesError };
  }
};
