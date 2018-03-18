import * as React from 'react'
import { Button } from 'antd';

export interface IState {
    btn_desc: string;
}
class App extends React.Component<{}, IState> {
    state = {
        btn_desc: '1234567'
    }
    render() {
        return (
            <div>
                <Button type="primary">{this.state.btn_desc}</Button>
                {/* <h1>123213</h1> */}
            </div>
        )
    }
}

export default App