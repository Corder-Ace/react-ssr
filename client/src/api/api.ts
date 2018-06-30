import axios from 'axios'
import * as urls from './urls'

let Api
const common = async (method: string, url: string, data: object) => {
    try {
        const response = await axios({
            method: method,
            url: url,
            data: data
        })
        const responseJSON = await response.data
        return responseJSON
    } catch (error) {
        console.log(error)
    }
}

export default Api = {
    login: (data: object) => common('post', urls.login, data)
}