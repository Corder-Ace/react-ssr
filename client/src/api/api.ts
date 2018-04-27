import axios from 'axios'
import * as urls from './urls'

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

export const login = (data: object) => common('post', urls.login, data)