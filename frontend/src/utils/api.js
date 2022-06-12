class Api {

    constructor({ adress, headers }) {
            this._adress = adress;
            this._headers = headers;
        }

    getInitialCards() {
            return fetch(`${this._adress}/cards`, { headers: this._headers, credentials:"include", method:'GET' })
                .then(response => this._checkRequestResult(response));

        }

    errorHandler(error) {
        console.log(error);
    }

    _checkRequestResult(response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Упс, возникла ошибка: ${response.status}`);
        }

    getUserInfo() {
        return fetch(`${this._adress}/users/me`, { headers: this._headers, credentials:"include", method:'GET' })
            .then(response => this._checkRequestResult(response));
    }

    editUserInfo(name, profession) {
        return fetch(`${this._adress}/users/me`, {
                method: 'PATCH',
                credentials:"include",
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: profession
                })
            })
            .then(response => this._checkRequestResult(response));
    }

    plusCard(name, link) {
            return fetch(`${this._adress}/cards`, {
                    method: 'POST',
                    headers: this._headers,
                    credentials:"include",
                    body: JSON.stringify({
                        name: name,
                        link: link
                    })
                })
                .then(response => this._checkRequestResult(response));
        }

    deleteCard(cardId) {
        return fetch(`${this._adress}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers,
                credentials:"include"
            })
            .then(response => this._checkRequestResult(response));
    }


    likeCard(cardId) {
        return fetch(`${this._adress}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers,
                credentials:"include"
            })
            // console.log(cardId)
            .then(response => this._checkRequestResult(response));
    }

    unlikeCard(cardId) {
        return fetch(`${this._adress}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers,
                credentials:"include"
            })
            .then(response => this._checkRequestResult(response));
    }

    editUserAvatar(urlAvatar) {
        console.log(urlAvatar);
        return fetch(`${this._adress}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                credentials:"include",
                body: JSON.stringify({
                    avatar: urlAvatar
                })
            })
            .then(response => this._checkRequestResult(response))
    }

}

const token = localStorage.getItem('jwt');

const api = new Api({
    adress: 'https://api.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});
export default api;
