import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../views/Login/Login'

class Index extends React.PureComponent<{}, {}>{
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
            </Switch>
        )
    }
}

export default Index