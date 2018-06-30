import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from '../../app'
import Login from '../views/Login/Login'
import Main from './Main'

class Index extends React.Component<{}, {}>{
    render() {
        return (
            <Switch>
                {/* <Route exact={true} component={App} /> */}
                <Route path="/login" component={Login} />
                <Route path="/timeline" component={Main} />
            </Switch>
        )
    }
}

export default Index