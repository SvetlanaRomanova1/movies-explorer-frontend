class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Приватный метод для проверки ответа от сервера и обработки ошибок
  // eslint-disable-next-line class-methods-use-this
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    if (res.headers.get('Content-Type')?.includes('application/json')) {
      return res.json()
      // eslint-disable-next-line prefer-promise-reject-errors
        .then((json) => Promise.reject(`Ошибка: ${json.validation?.body?.message || json.message}`));
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод для получения информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      // eslint-disable-next-line no-underscore-dangle
    }).then(this._checkResponse);
  }

  // Метод для редактирования информации о пользователе на сервере
  editUserInfo(user) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
      // eslint-disable-next-line no-underscore-dangle
    }).then(this._checkResponse);
  }

  // Метод для получения всех сохранённых текущим пользователем фильмов
  getSaveMovies() {
    return fetch(`${this.baseUrl}/movies`, {
      headers: this.headers,
      // eslint-disable-next-line no-underscore-dangle
    }).then(this._checkResponse);
  }

  // Метод для сохранения фильма
  saveNewMovies(data) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
      // eslint-disable-next-line no-underscore-dangle
    }).then(this._checkResponse);
  }

  // Метод для удаления фильма из сохранённых
  deleteMovies(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
      // eslint-disable-next-line no-underscore-dangle
    }).then(this._checkResponse);
  }

  // Метод для создания пользователя
  signup(body) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify(body),
      // eslint-disable-next-line no-underscore-dangle
    }).then(this._checkResponse);
  }

  // Метод для входа пользователя
  signin(body) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify(body),
      // eslint-disable-next-line no-underscore-dangle
    }).then(this._checkResponse);
  }

  // Метод для выхода пользователя
  signout() {
    return fetch(`${this.baseUrl}/signout`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      // eslint-disable-next-line no-underscore-dangle
    }).then(this._checkResponse);
  }
}

const mainApi = new Api({
  baseUrl: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
