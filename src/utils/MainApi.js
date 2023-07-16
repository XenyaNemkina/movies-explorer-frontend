class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkHeaders = () => {
    this._token = localStorage.getItem('token');
    this._headers.authorization = `Bearer ${this._token}`;
    return this._headers;
  };

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
    })
    .then(res => this._getResponseData(res))
    .then((res) => {
      return res;
    })
  }

  authorization(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((res) =>
      this._getResponseData(res))
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
      }
    })
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then(res => this._getResponseData(res))
      .then((data) => data);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,
    {headers: this._checkHeaders()})
    .then(this._getResponseData);
  }

getInitialMovies() {
  return fetch(`${this._baseUrl}/movies`, 
  {headers: this._checkHeaders()})
  .then(this._getResponseData);
 }

 postMovie(data) {
  let {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
  } = data

  const token = localStorage.getItem('token')
  return fetch(`${this._baseUrl}/movies`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        country: country || 'NoSelected',
        director: director || 'NoSelected',
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
        movieId: id,
      }
    )
  })
  .then(this._getResponseData)
}

getSavedFilms() {
  const jwt = localStorage.getItem('jwt')
  return fetch(`${this._baseUrl}/movies`, {
    headers: {
      authorization: jwt,
      "Content-Type": "application/json"
    },
  })
  .then(this._getResponseData)
    .catch(err => console.log(err))
}

deleteMovie(cardId) {
  const jwt = localStorage.getItem('jwt')
  return fetch(`${this._baseUrl}/movies/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `${jwt}`,
      'Content-Type': 'application/json'
    }
  })
  .then(this._getResponseData);
}}

const newMainApi = new MainApi({
  baseUrl:  "http://localhost:3000",
  //"https://api.mesto.xenyanemkina.nomoredomains.rocks",
});

export default newMainApi;