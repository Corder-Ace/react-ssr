import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'


// if (typeof window !== 'undefined') {
    ReactDOM.hydrate(<App />, document.querySelector('#root'))
// }

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
//     module.hot.accept('./app.js', () => {
//         const NextApp = require('./app.js').default
//         // ReactDOM.hydrate(<NextApp />, document.querySelector('#root'))
//         render(App)
//     })
// }