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
    let voteError;
    if (!res.ok) {
      throw new Error('Something went wrong with your vote');
    } else {
      voteError = null;
    }
    return { voteError }
  } catch (error) {
    console.log(error);
    const voteError = 'System error';
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
      votesError = 'Something went wrong fetching votes';
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

export const deleteVote = async (voteId: number) => {
  try {
    const requestHeaders = setBaseHeaders();
    const res = await fetch(`${VOTES_URL}/${voteId}`, {
      headers: requestHeaders,
      method: 'DELETE'
    });
    let response;
    let voteError;
    if (!res.ok) {
      response = [];
      voteError = 'Something went wrong deleting vote';
    } else {
      response = await res.json();
      voteError = null;
    }
    return { response, voteError };
  } catch (error) {
    console.log(error);
    const response: [] = [];
    const voteError = 'System error';
    return { response, voteError };
  }
}