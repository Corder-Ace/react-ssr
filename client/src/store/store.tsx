import { observable, computed, action, autorun } from 'mobx'

export default class AppState {
    @observable user_name: string = 'Ace';
    @observable token: string = "";
    @observable menuSwitch: boolean = true

    @action toggleUserName(name: string) {
        this.user_name = name
    }

    @action setToken(token: string) {
        this.token = token
    }

    @action toggleMenuShow(flag: boolean) {
        this.menuSwitch = flag
    }
}

export const appState = new AppState()
autorun(() => {
    console.log(appState.menuSwitch)
})