import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useApolloClient, gql } from '@apollo/client'

import Button from '../components/Button'

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`

const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }

    input {
        width: 100%;
        margin-bottom: 1em;
    }
`

const SIGN_UP = gql`
    mutation SignUp($input: SignUpInput!) {
        signUp(input: $input)
    }
`

const SignUp = props => {
    const [values, setValues] = useState()

    useEffect(() => {
        document.title = 'Sign Up - Jots'
    })

    const [signUp, { loading, error }] = useMutation(SIGN_UP, {
        onCompleted: ({ signUp }) => {
            console.log(signUp)
        }
    })

    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
    return (
        <Wrapper>
            <Form
                onSubmit={event => {
                    event.preventDefault()
                    signUp({
                        variables: {
                            input: { ...values }
                        }
                    })
                }}
            >
                <label htmlFor="username">Username:</label>
                <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={onChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}
                />
                <Button type="submit">
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </Form>
        </Wrapper>
    )
}

export default SignUp