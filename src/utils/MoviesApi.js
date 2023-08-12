class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  async getMovies() {
    const res = await fetch(`${this._url}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return this._checkResponse(res);
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
