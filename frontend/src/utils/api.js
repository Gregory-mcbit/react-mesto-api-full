class Api {
    constructor({baseUrl, headers}){
      this._baseUrl = baseUrl
      this._headers = headers
    }

    // Получить начальные карточки
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {headers: this._headers, credentials:"include", method:'GET'})
      .then(response => this._checkRequestResult(response))
    }

    // Добавление новой карточки на сервер
    addCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        credentials:"include",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(response => this._checkRequestResult(response))
    }

    // Удалить карточку
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        credentials:"include",
        headers: this._headers,
      })
      .then(response => this._checkRequestResult(response))
    }

    // Постановка лайка карточке
    likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        credentials:"include",
        headers: this._headers,
      })
      .then(response => this._checkRequestResult(response))
    }

    // Удаление лайка карточке
    unlikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        credentials:"include",
        headers: this._headers,
      })
      .then(response => this._checkRequestResult(response))
    }

    // Получить данные пользователя
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {headers: this._headers, credentials:"include", method:'GET'})
      .then(response => this._checkRequestResult(response))
    }

    // Отредактировать данные пользователя
    editUserInfo(name, profession) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        credentials:"include",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: profession
        })
      })
      .then(response => this._checkRequestResult(response))
    }

    // Отредактировать аватар пользователя
    editUserAvatar(urlAvatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        credentials:"include",
        headers: this._headers,
        body: JSON.stringify({
          avatar: urlAvatar
        })
      })
      .then(response => this._checkRequestResult(response))
    }

    _checkRequestResult(response) {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Возникла ошибка: ${response.status}`)
    }

    errorHandler(error) {
      console.log(error)
    }
  }

  // Работа с API
  const api = new Api({
    baseUrl: 'https://api.nomoredomains.xyz',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  export default api