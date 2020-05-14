import React, { Component } from 'react'
import axios from 'axios'
import '../styles/main.css'
import Link from 'next/link'

class Home extends Component {
    static async getInitialProps({ pathname, query, asPath, req, res }) {
        let userData
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            userData = res.data
        } catch {
            console.log('error')
        }
        // console.log(pathname)
        // console.log(query)
        // console.log(asPath)
        return {
            user: {
                name: 'Ram',
                lastName: 'Shiv'
            },
            userData
        }
    }

    constructor(props) {
        super(props) 
        this.state = {
            user: this.props.user,
            userData: this.props.userData
        }
    }

    renderUserList = (users) => {
        return users.map((user, index) => {
            return(
                <li className="list-group-item" key={index}>
                    {/* <Link href={`/users/profile?userId=${user.id}`} />  or */}
                    <Link 
                    as={`/user/profile/${user.id}`}
                    href={{
                        pathname: `/users/profile`,
                        query: {
                            userId: user.id
                        }
                    }}>
                        <a> {user.name} </a>
                    </Link>
                </li>
            )
        })
    }

    render() {
        return(
            <>
            <h1>Pick a user.</h1>
            <ul className="list-group">
                {this.renderUserList(this.props.userData)}
            </ul>
            </>
        )
    }
}

export default Home