import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__submit');
    }

    removeCallback(callback) {
        this._removeListener = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._removeListener();
        })
    }

}