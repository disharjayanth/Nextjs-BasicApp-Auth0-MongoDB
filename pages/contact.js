import React, { Component } from 'react'

class Contact extends Component {
    render() {
        return (
            <>
            <h1>Contact</h1>
            <div style={{ color: 'red' }}>
                Hello guys
            </div>
            <div className="a">
                Styles with styed-jsx
            </div>
            <style jsx>
                    {`
                        .a {
                            color: orange
                        }
                    `}
            </style>
            <div className="contact_static">
                        Styles with static CSS!
            </div>
            <div>
                <img src="/static/images/lake.jpg"/>
            </div>    
            </>
        )
    }
}

export default Contact