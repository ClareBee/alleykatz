import { setBaseHeaders } from "../utils/headers";

export const FAVOURITE_URL = 'https://api.thecatapi.com/v1/favourites';

export const getFavourites = async (userId: string) => {
  try {
    const requestHeaders = setBaseHeaders();
    const res = await fetch(`${FAVOURITE_URL}?sub_id=${userId}`, {
      headers: requestHeaders
    });
    let response;
    let favouritesError;
    if (!res.ok) {
      response = [];
      favouritesError = 'Something went wrong fetching favourites';
    } else {
      response = await res.json();
      favouritesError = null;
    }
    return { response, favouritesError };
  } catch (error) {
    console.log(error);
    const response: [] = [];
    const favouritesError = 'System error';
    return { response, favouritesError };
  }
};

export const unfavourite = async (favouriteId: number) => {
  const requestHeaders = setBaseHeaders()
  requestHeaders.set('Content-Type', 'application/json');
  try {
    const requestHeaders = setBaseHeaders();
    requestHeaders.set('Content-Type', 'application/json');
    const res = await fetch(`${FAVOURITE_URL}/${favouriteId}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'same-origin',
      headers: requestHeaders,
    });
 
    let unfavouriteError;
    if (!res.ok) {
      unfavouriteError = 'Something went wrong';
    } else {
      console.log(res)
      unfavouriteError = null;
    }
    return { unfavouriteError };
  } catch (error) {
    console.log(error);
    const favouriteError = 'System error';
    return { favouriteError };
  }
};

export const favourite = async (imageId: string) => {
  try {
    const requestHeaders = setBaseHeaders();
    requestHeaders.set('Content-Type', 'application/json');
    const data = {
      image_id: imageId,
      sub_id: '123',
    };
  
    const res = await fetch(FAVOURITE_URL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: requestHeaders,
      body: JSON.stringify(data),
    });
    let favouriteError;
    if (!res.ok) {
      favouriteError = 'Something went wrong';
    } else {
      console.log(res)
      favouriteError = null;
    }
    return { favouriteError };
  } catch (error) {
    console.log(error);
    const favouriteError = 'System error';
    return { favouriteError };
  }
};