export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {

    }

    getUserInfo() {
        fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => res.json())
            .then(json => console.log(json));
    }
}