import React, { Component } from 'react'
import MainLayout from '../components/layout/MainLayout'
import auth0Serv from '../lib/appAuth'
import Router from 'next/router'

class LoginSuccess extends Component {

    state = {
        error: false
    }

    componentDidMount() {
        auth0Serv.handleAuthentication().then(() => {
            console.log("OK!")
            Router.push('/about')
        }).catch((err) => {
            this.setState({
                error: true
            })
        }) 
    }

    render() {
        return (
            <>
            {
            !this.state.error ? 
                <div>Signing In Please Wait....</div>
                :
                <div>Sorry something went wrong</div>
            }
            </>
        )
    }
}

export default LoginSuccess