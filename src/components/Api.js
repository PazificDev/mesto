const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `${this._headers.authorization}`,
            }
        })
        .then(handleResponse)
        .then((data) => {
            return data;
        })
    }

    postNewCard(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',    
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
              })
        })
        .then(handleResponse)
        .then((data) => {
            return data;
        })
    }

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `${this._headers.authorization}`,
            }
        })
        .then(handleResponse)
        .then((data) => {
            return data;
        })
    }
    
    patchUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',    
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
              })
        })
        .then(handleResponse)
        .then((data) => {
            return data;
        })
    }

    patchUserPhoto(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',    
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link,
              })
        })
        .then(handleResponse)
        .then((data) => {
            return data;
        })
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._headers.authorization}`,
            }
        })
        .then((res) => {
            
            if (res.ok) {
                return res.ok;
            }
        })
    }

}
  