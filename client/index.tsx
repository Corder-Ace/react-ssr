import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import appState from './src/store/store'
import Index from './src/route/index'
import './src/static/css/base.scss'
import './src/static/css/reset.scss'
// import {appState} from './src/store/store'
const renderMethod = process.env.NODE_ENV === 'development' ? ReactDOM.render : ReactDOM.hydrate

renderMethod(
    <Provider appState={new appState()}>
        <BrowserRouter>
            <Index />
        </BrowserRouter>
    </Provider>
    , document.querySelector('#root'))
