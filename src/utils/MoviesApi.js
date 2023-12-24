class MoviesApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Метод для запроса фильмов с Beatfilm Movies API
  getMovies() {
    return fetch(`${this.baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      // eslint-disable-next-line no-underscore-dangle
    }).then((res) => this._requestResult(res));
  }

  getMoviesBackQuery(params) {
    return fetch(`${this.baseUrl}/beatfilm-movies/?query=${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      // eslint-disable-next-line no-underscore-dangle
    }).then((res) => this._requestResult(res));
  }

  // eslint-disable-next-line class-methods-use-this
  _requestResult(res) {
    if (res.ok) {
      return res.json();
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
