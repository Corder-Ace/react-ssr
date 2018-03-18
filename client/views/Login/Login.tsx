import * as React from 'react'

export interface LoginState{
    account:String,
    password:String
}

class Login extends React.PureComponent<{},LoginState>{
    render(){
        return(
            <div>登录界面</div>
        )
    }
}

export default Login