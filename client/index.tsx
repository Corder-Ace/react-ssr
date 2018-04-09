import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import appState from './store/store'
import Index from './route/index'
import App from './app'


ReactDOM.hydrate(
    <Provider appState={new appState()}>
        <BrowserRouter>
            <Index />
        </BrowserRouter>
    </Provider>
    , document.querySelector('#root'))

// public Component:any
// const root = document.querySelector('#root')
// const render = Component => {
//     ReactDOM.hydrate(
//         <AppContainer>
//             <Component />
//         </AppContainer>,
//         root
//     )
// }
// render(App)
// if (module.hot) {
//     module.hot.accept('./app.tsx', () => {
//         const NextApp = require('./app.tsx').default
//         ReactDOM.hydrate(<NextApp />, document.querySelector('#root'))
//         render(App)
//     })
// }