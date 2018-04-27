import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../views/Login/Login'
import Main from '../views/Main/Main'
class Index extends React.PureComponent<{}, {}>{
    render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={Main} />
                <Route path="/login" component={Login} />
            </Switch>
        )
    }
}

export default Index