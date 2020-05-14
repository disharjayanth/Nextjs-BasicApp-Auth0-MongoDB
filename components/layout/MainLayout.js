import React from 'react'
import Header from '../includes/Header'
import Head from 'next/head'

const MainLayout = (props) => {
    return (
        <div>
            <Head>
                {
                    props.pageConfigs === 'Admin' ?
                    <title>Admin Page</title> 
                    :
                    <title>Awesome App.</title>                
                }
                <meta name="description" content="Welcome to Basic Nextjs App" />
                <meta name="keywords" content="Nextjs JSON Express" />

                <meta property="og:title" content="Webpage" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${props.baseUrl}`} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:description" content="Welcome to Basic Nextjs App." />

                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;500;700&display=swap" rel="stylesheet" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"/>
                <link href="/static/css/style.css" rel="stylesheet" />
            </Head>
        <div className="MainLayout_container">
            <Header {...props} />
            <div className="container">
                {props.children}
            </div>
        </div>
        </div>
    )
}

export default MainLayout