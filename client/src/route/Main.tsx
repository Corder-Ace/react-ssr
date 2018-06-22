import * as React from 'react'
import { Route } from 'react-router-dom'
import Subscribe from '../views/Subscribe/Subscribe'
import { observer, inject } from 'mobx-react';

export interface Props {
    match: { path: string },
    appState: any
}
@inject('appState')
class Main extends React.Component<Props, null>{
    render() {
        const { path } = this.props.match
        return [
            <Route key={2} path={`${path}/subscribe`} component={Subscribe} />
        ]
    }
}

export default Main