import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import AuthRoute from '../../components/HOC/authRoute'

import { getCooksFromReq } from '../../lib/utils'

class Users extends Component {
    static async getInitialProps({req}) {

        let usersList
        let reqCookie
        if(!process.browser) { //for server
            reqCookie = getCooksFromReq(req, 'x-jwt')
        } else  {
            reqCookie = Cookies.get('x-jwt') //for client
        }
        try {
            const response = await axios.get('http://localhost:3000/api/users', {
                headers: {
                    'authorization': `Bearer ${reqCookie}`
                }
            })
            usersList = response.data
        } catch(err) {
            console.log(err)
        }
        
        return {
            user: 'Ram',
            pageConfigs: 'Admin',
            usersList
        }
    }

    render() {
        // console.log(this.props)
        return(
             <h1>Users index.</h1>
        )
    }
}

export default AuthRoute(Users)