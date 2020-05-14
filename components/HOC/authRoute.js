import React from 'react'
import auth0Serv from '../../lib/appAuth'

export default function(Component) {
    return class AuthRoute extends React.Component {

        static async getInitialProps(ctx) {
            let pageProps = {}
            let reallyAuth = {}

            reallyAuth = await auth0Serv.isAuthenticated(ctx.req)
            if( Component.getInitialProps ) {
                pageProps = await Component.getInitialProps(ctx)
            }
            return {...pageProps, reallyAuth}
        }

        renderPage = () => {
            return this.props.userAuth ? 
            <Component {...this.props} /> 
            :
             'Unauthorised!'
        }

        render() {
            return (
                this.renderPage()
            )
        }
    }
} 