export default class UserInfo {
    constructor({usernameSelector, descriptionSelector}) {
        this._username = document.querySelector(usernameSelector);
        this._desc = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        return {username: this._username.textContent, description: this._desc.textContent};
    }

    setUserInfo({username, userdescription}) {
        this._username.textContent = username;
        this._desc.textContent = userdescription;
    }
}