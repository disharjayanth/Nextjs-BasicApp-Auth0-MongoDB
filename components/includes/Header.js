import React from 'react'
import Link from 'next/link'
import auth0Serv from '../../lib/appAuth'

const Header = (props) => {
    return(
        <>
        <header className={props.headerStyle}>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link href="/">
                        <a className="navbar-brand">My Page</a>
                    </Link>

                    <div className="collapse navbar-collapse">

                        <div className="navbar-nav">
                        <Link href='/'><a className="nav-item nav-link">Home</a></Link> 
                        <Link href='/contact'><a className="nav-item nav-link">Contact</a></Link>
                        <Link href='/about'><a className="nav-item nav-link">About us</a></Link>
                        <Link href='/adduser'><a className="nav-item nav-link">Add User</a></Link>

                        {
                            props.userAuth ?
                            <Link href='/users'><a className="nav-item nav-link">Users</a></Link>
                            :
                            null
                        }

                        {
                            props.userAuth ? 
                            <span className="nav-item nav-link" onClick={() => auth0Serv.logout()}>
                            LogOut
                            </span>
                            :
                            <span className="nav-item nav-link" onClick={() => auth0Serv.login()}>
                            LogIn
                            </span>
                        }
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        </>
    )
}

export default Header