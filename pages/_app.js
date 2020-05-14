import React from 'react'
import App from 'next/app'
import auth0Serv from '../lib/appAuth'

import MainLayout from '../components/layout/MainLayout'

import getConfig from 'next/config' //for ENV VARIABLESx
const { publicRuntimeConfig } = getConfig()

class MyApp extends App {
    static async getInitialProps({ Component, ctx}) { //ctx is Context where req, res, url, pathname and query etc resides.
        let pageProps = {}
        let userAuth = {}
        let baseUrl = publicRuntimeConfig.base_url

        userAuth = await auth0Serv.isAuthenticated(ctx.req)
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps, userAuth, baseUrl }
    }

    render() {
        const { Component, pageProps, userAuth, baseUrl } = this.props
        // console.log(this.props)
        // console.log(pageProps)
        const headerStyle = pageProps.headerStyle ? pageProps.headerStyle : ''
        const pageConfigs = pageProps.pageConfigs ? pageProps.pageConfigs : ''
    return (
        <MainLayout userAuth = {userAuth} headerStyle={headerStyle} pageConfigs={pageConfigs} baseUrl={baseUrl}>
            <Component {...pageProps} userAuth = {userAuth} baseUrl={baseUrl} />
        </MainLayout>
    )
  }
}

export default MyApp