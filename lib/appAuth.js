import auth0 from 'auth0-js'
import Cookies from 'js-cookie'
import { getCooksFromReq } from '../lib/utils'

import jwt from 'jsonwebtoken'
import axios from 'axios'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

class Auth0 {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: 'dev-tn3cyve4.auth0.com',
            clientID: `${publicRuntimeConfig.client_id}`,
            redirectUri: `${publicRuntimeConfig.base_url}/login-success`,
            responseType: 'token id_token',
            scope: 'openid'
        })
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this)
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                  this.setSession(authResult);
                  resolve()
                } else if (err) {
                  reject(err)
                }
              });
        })
    }

    setSession(authResult) {
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
        Cookies.set('x-jwt-exp', expiresAt)
        Cookies.set('x-jwt', authResult.idToken)
    }

    login() {
        this.auth0.authorize()
    }

    logout() {
        Cookies.remove('x-jwt-exp')
        Cookies.remove('x-jwt')
        this.auth0.logout({
            clientID: `${publicRuntimeConfig.client_id}`,
            returnTo: `${publicRuntimeConfig.base_url}`
        })
    }

    async getJWST() {
        const res = await axios.get('https://dev-tn3cyve4.auth0.com/.well-known/jwks.json')
        const jwks = res.data
        return jwks
    }

    certToPEM(cert) {
        cert = cert.match(/.{1,64}/g).join('\n');
        cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
        return cert;
      }

    async verifyToken(token) {
        if(token) {
            // const decodeToken = jwt.decode(token, { complete: true })
            const jwks = await this.getJWST()

            const certificate = this.certToPEM(jwks.keys[0].x5c[0])
            
            try {
                const decodedVerify = jwt.verify(token, certificate)
                
                const expiredAt = decodedVerify.exp * 1000

                return (decodedVerify && new Date().getTime() < expiredAt ) ? true : false

            } catch{
                return false
            }
        }
        return false
    }

    async isAuthenticated(req) {
        if(process.browser) {
            const token = Cookies.get('x-jwt')
            const verifyToken = await this.verifyToken(token)
            return verifyToken
        } else {
            let token = getCooksFromReq(req, 'x-jwt')
            const verifyToken = await this.verifyToken(token)
            return verifyToken
        }
    }

    // async isAuthenticated(req) {
    //     if(process.browser) {
    //         let expiresAt = Cookies.get('x-jwt-exp')
    //         return new Date().getTime() < expiresAt
    //     } else {
    //         let expiresAt = getCooksFromReq(req, 'x-jwt-exp')
    //         return new Date().getTime() < expiresAt
    //     }
    // }
} 

const auth0Serv = new Auth0()
export default auth0Serv