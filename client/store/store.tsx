import { observable, computed, action, autorun } from 'mobx'

class AppState {
    @observable user_name:string = 'Ace';

    @computed get user() {
        return `${this.user_name}`
    }

    @action toggleUserName(name:string) {
        this.user_name = name
    }
}


const appState = new AppState()


autorun(() => {
    console.log(appState.user_name)
})

export default appState
