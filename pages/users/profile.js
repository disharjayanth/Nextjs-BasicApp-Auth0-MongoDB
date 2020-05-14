import React, { Component } from 'react'
import axios from 'axios'

class Profile extends Component {
    static async getInitialProps({ query }) {
        let user
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${query.userId}`)
            user = response.data
        } catch {
            console.log('error')
        }
        return {
            user
        }
    }

    showUser = (user) => {
        return(
            <div>
                <div>Name: {user.name} </div>
                <div>Phone no.: {user.phone} </div>
                <div>Email: {user.email} </div>
            </div>
        )
    }

    render() {
        return (
            <>
            <h1>User Profile</h1>
                <br />
            {this.showUser(this.props.user)}
            </>
        )
    }
}

export default Profile