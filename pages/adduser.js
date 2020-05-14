import React, { Component } from 'react'
import { Formik } from 'formik'
import axios from 'axios'

class UserForm extends Component {

    handleSubmit = (values, actions) => {
        axios({
            method: 'POST',
            url: '/api/v1/users',
            data: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => {
            actions.setSubmitting(false)
            actions.resetForm()
        })
    }

    handleRules = (values) => {
        let errors = {}

        if(!values.name) { errors.name = 'Name is required.'}

        if(!values.lastName) { errors.lastName = 'Lastname is required.'}

        if(!values.age) {
         errors.age = 'Age is required.'
        } else if(values.age < 20) {
         errors.age = 'Sorry you need to be older than 20.'   
        }

        return errors
    }

    render() {
        return (
            <>
            <h1>Add User:</h1>
            <Formik
                initialValues={{ name:'', lastName:'', age: '' }}
                validate={(values) => this.handleRules(values)}
                onSubmit={(values, actions) => this.handleSubmit(values, actions)} //actions arg is for isSubmitting for disabling button when form is submitting since server takes time to load.
            >
                {({errors, values, handleSubmit, handleChange, isSubmitting, handleBlur, touched}) => {
                    return(
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Enter the name."
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            />
                            { errors.name && touched.name
                            ?
                            <div style={{ 'color': 'red' }}>{errors.name}</div>
                            :
                            null
                            }
                        </div>

                        <div className="form-group">
                            <label>LastName</label>
                            <input 
                            name="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Enter the last name."
                            value={values.lastName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            />
                            { errors.lastName && touched.lastName
                            ?
                            <div style={{ 'color': 'red' }}>{errors.lastName}</div>
                            :
                            null
                            }
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input 
                            name="age"
                            type="text"
                            className="form-control"
                            placeholder="Enter the age."
                            value={values.age}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            />
                            { errors.age && touched.age
                            ?
                            <div style={{ 'color': 'red' }}>{errors.age}</div>
                            :
                            null
                            }
                        </div>

                        <button disabled={isSubmitting} type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    )
                }}
            </Formik>
            </>
        )
    }
}

export default UserForm