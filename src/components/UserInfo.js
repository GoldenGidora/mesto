export default class UserInfo {
    constructor({usernameSelector, userDescSelector, avatarSelector}) {
        this._username = document.querySelector(usernameSelector);
        this._desc = document.querySelector(userDescSelector);
        this._avatar = document.querySelector(avatarSelector);
        this.id = undefined;
    }

    getUserInfo() {
        return {username: this._username.textContent, description: this._desc.textContent, avatar: this._avatar};
    }

    setUserInfo(data) {
        if(data.name && data.about && data.avatar) {
            this._username.textContent = data.name;
            this._desc.textContent = data.about;
            this._avatar.src = data.avatar;
            this.id = data._id;
        }
    }
}