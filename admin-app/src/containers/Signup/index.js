import React from 'react'
import { Row } from 'react-bootstrap';
import { Layout } from '../../components/Layout'
import { Container, Form, Col, Button } from 'react-bootstrap';
import { Input } from '../../components/UI/input';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { signup } from '../../actions';


/**
* @author
* @function Signup
**/

export const Signup = (props) => {

  
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = useSelector(state => state.auth);
  const user = useSelector(state =>state.user);

  const dispatch = useDispatch();

  const userSignup = (e) => {

    e.preventDefault();

    const user = {
      firstName , lastName , email , password
    }
    dispatch(signup(user));
  }

  if(user.loading){
    return <p>Loading ...</p>
  }

  if (auth.authenticate) {
    return <Navigate to={'/'} />
  }



  return (
    <div>
      <Layout />
      {/* <div id = "jumbotron" className='text-center'> */}
      {/* </div> */}
      <Container>
        { user.message }
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>

              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => { setfirstName(e.target.value) }}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => { setlastName(e.target.value) }}
                  />
                </Col>
              </Row>
              <Form.Group>
                <Input
                  label="Email"
                  placeholder="Email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Input
                  label="Password"
                  placeholder="Password"
                  value={password}
                  type="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )

}