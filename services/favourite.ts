import { setBaseHeaders } from "../utils/headers";
import { FAVOURITE_URL } from "./constants";


export const getFavourites = async (userId: string) => {
  try {
    const requestHeaders = setBaseHeaders(process.env.NEXT_PUBLIC_API_KEY);
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
    const favouritesError = 'System error: data might be out of date';
    return { response, favouritesError };
  }
};

export const unfavourite = async (favouriteId: number) => {
  const requestHeaders = setBaseHeaders(process.env.NEXT_PUBLIC_API_KEY)
  requestHeaders.set('Content-Type', 'application/json');
  try {
    const requestHeaders = setBaseHeaders(process.env.NEXT_PUBLIC_API_KEY);
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
      unfavouriteError = null;
    }
    return { unfavouriteError };
  } catch (error) {
    console.log(error);
    const favouriteError = 'System error: data may be out of date';
    return { favouriteError };
  }
};

export const favourite = async (imageId: string, userId = '123') => {
  try {
    const requestHeaders = setBaseHeaders(process.env.NEXT_PUBLIC_API_KEY);
    requestHeaders.set('Content-Type', 'application/json');
    const data = {
      image_id: imageId,
      sub_id: userId,
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
      favouriteError = 'System error: data may be out of date';
    } else {
      favouriteError = null;
    }
    return { favouriteError };
  } catch (error) {
    console.log(error);
    const favouriteError = 'System error';
    return { favouriteError };
  }
};
