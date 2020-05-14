import React, { Component } from 'react'
import Message from '../components/includes/Message'
import Router from 'next/router'

class About extends Component {
    static getInitialProps() {
        let headerStyle = 'skyblue'
        return {headerStyle}
    }

    // handleChange = (url) => {
    //     console.log('App is changing to:', url)
    // }

    // handleComplete = (url) => {
    //     console.log('App has changed:', url)
    // }

    // handleHistory = (url) => {
    //     console.log('History changed:', url)
    // }

    // handleError = (url) => {
    //     console.log('Error spotted:', url)
    // }

    // componentDidMount() {
    //     Router.events.on('routeChangeStart', this.handleChange)
    //     Router.events.on('routeChangeComplete', this.handleComplete)
    //     Router.events.on('beforeHistoryChange', this.handleHistory)
    //     Router.events.on('routeChangeError', this.handleError)
    // }    
        // Router.beforePopState(({url, as, options}) => {
        //     if(as === '/contact') {
        //         window.location.href = as
        //         return false
        //     }
        //     return true
        // })
        //Router.replace('/contact','/contact/69')
    
    render() {
        return (
            <>
                <h1>About</h1>
                <Message />
                <br />
                <span onClick={() => Router.push('/contact')}>
                    Click me now!
                </span>
            </>
        )
    }
}

export default About