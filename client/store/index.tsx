import AppStateClass from './store'

export const AppState = AppStateClass

//专门用来给SSR使用
export const createStoreMap = () => {
    return {
        appState: new AppState()
    }
}

export default {
    AppState,
}