import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../../redux/slices/userSlices';
import { toast } from 'react-toastify';
function AccountDetail(props) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const isLoading = useSelector(state => state.user.isLoading);
    const isError = useSelector(state => state.user.isError);
    const [username, setUsername] = useState(user ? user.username : "");
    const [first_name, setFirstName] = useState(user ? user.first_name : "");
    const [last_name, setLastName] = useState(user ? user.last_name : "");
    const [phone_number, setPhoneNumber] = useState(user ? user.phone_number : "");
    const [email, setEmail] = useState(user ? user.email : "")
    const updateUser = async (e) => {
        e.preventDefault();
        const updateData = {
            username: username,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            email: email
        }
        const res = await dispatch(update(updateData));
    }
    return (
        <Container>
            <div className='mt-1'>
                <Form>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly value={user && user.email} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            Username
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            First name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="First name" value={first_name} onChange={(e) => { setFirstName(e.target.value) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            Last name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Last name" value={last_name} onChange={(e) => { setLastName(e.target.value) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            Phone number
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Phone number" value={phone_number} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                        </Col>
                    </Form.Group>

                    <Button variant="danger mb-2 " onClick={(e) => { updateUser(e) }}
                        disabled={isLoading ? true : ""}>{isLoading ? "Saving user information ..." : "Save"}</Button>
                </Form>
            </div>
        </Container>

    );
}

export default AccountDetail;