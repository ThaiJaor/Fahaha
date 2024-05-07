import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../../redux/slices/userSlices';
import { toast } from 'react-toastify';
function ChangePassword(props) {
    const [old_password, set_old_password] = useState("");
    const [new_password, set_new_password] = useState('');
    const [confirm_new_password, set_confirm_new_password] = useState('');
    const isLoading = useSelector(state => state.user.isLoading);
    const [validate, setValidate] = useState(false);
    const isError = useSelector(state => state.user.isError);
    const dispatch = useDispatch()
    const handleUpdatePassword = async () => {
        const res = await dispatch(updatePassword({ old_password, new_password, confirm_new_password }));
    }
    return (
        <Container>
            <div className='mt-3'>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Password" value={old_password} onChange={(e) => { set_old_password(e.target.value) }} isInvalid={old_password.length <= 0} />
                            <Form.Control.Feedback type="invalid">
                                Password can not be null
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            New password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="New password" value={new_password} onChange={(e) => { set_new_password(e.target.value) }} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            Confirm password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Confirm password" value={confirm_new_password} onChange={(e) => { set_confirm_new_password(e.target.value) }} isInvalid={new_password != confirm_new_password} />
                            <Form.Control.Feedback type="invalid">
                                New password and confirmed password are not the same
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Button variant="danger mb-2 " onClick={() => { handleUpdatePassword() }}
                        disabled={(isLoading ? true : "") || (!new_password || !confirm_new_password || !old_password)}>{isLoading ? "Updating password ..." : "Save"}</Button>
                </Form>
            </div>
        </Container>

    );
}

export default ChangePassword;