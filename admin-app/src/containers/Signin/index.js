import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import { Layout } from '../../components/Layout'
import { Container, Form, Col, Button } from 'react-bootstrap';
import { Input } from '../../components/UI/input';
import { login } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


/**
* @author
* @function Signin
**/

export const Signin = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {

    e.preventDefault();

    const user = {
      email, password
    }

    dispatch(login(user));
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
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
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