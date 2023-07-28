import {MY_API_URL} from './constants';

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

    _getResponseData(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    }
  
    async register(name, email, password) {
      const res = await fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
      });
      const res_2 = this._getResponseData(res);
      return res_2;
    }
  
    async authorization(email, password) {
      const res = await fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      return this._getResponseData(res);
      }
    
  
    async checkToken(token) {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = this._getResponseData(res);
      return data;
    }

  
    _checkHeaders = (token) => {
      this._token = localStorage.getItem('token');
      this._headers.authorization = `Bearer ${this._token}`;
      return this._headers;
    };
  
      async getUserInfo(token) {
          const res = await fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        return this._getResponseData(res);
        }
  
    //добавление информации о пользователе
    async setUserInfo({name, email}) {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._checkHeaders(),
        body: JSON.stringify({
          name,
          email,
        }),
      });
      return this._getResponseData(res);
    }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._checkHeaders(),
    })
    .then(this._checkResponse)
  }

  saveMovie(body) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._checkHeaders(),
      body: JSON.stringify(body)

    })
    .then(this._checkResponse)
  }

  logOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: this._headers
    })
    .then(this._checkResponse)
  }
};

export const newMainApi = new MainApi({
  baseUrl: MY_API_URL,
   // "https://api.mesto.xenyanemkina.nomoredomains.rocks",
  headers: {
     "Content-Type": "application/json",
     "Accept": "application/json",
  },
});


