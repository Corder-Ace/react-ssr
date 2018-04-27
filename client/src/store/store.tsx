import { observable, computed, action, autorun } from 'mobx'

export default class AppState {
    @observable user_name: string = 'Ace';
    @observable token: string = "";

    @action toggleUserName(name: string) {
        this.user_name = name
    }

    @action setToken(token: string) {
        this.token = token
    }
}


