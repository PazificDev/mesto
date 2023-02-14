export class UserInfo {
    constructor({name, info}) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
    }

    getUserInfo() {
        return({name: this._name.textContent, info: this._info.textContent});
    }

    setUserInfo({nameEdit, aboutEdit}) {
        this._name.textContent = nameEdit;
        this._info.textContent = aboutEdit;
    }
}