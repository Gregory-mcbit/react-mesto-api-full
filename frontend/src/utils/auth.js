export const BASE_URL = 'https://api.nomoredomains.xyz';

const checkRequestResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials:"include",
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('jwt'),
    },
    body: JSON.stringify({email, password})
  })
  .then(checkRequestResult)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials:"include",
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('jwt'),
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => checkRequestResult(res))
  .then((data) => {
    if (data.jwt) {
      localStorage.setItem('jwt', data.token);
      return data.token;
    }
  })
}

export const getContent = (token) => {return fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  credentials:"include",
  headers: {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('jwt'),
  },
})
  .then(checkRequestResult)
  .then((data) => data)
}
