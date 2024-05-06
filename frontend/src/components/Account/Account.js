import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AccountDetail from './AccountDetail/AccountDetail';
import ChangePassword from './ChangePassword/ChangePassword';
import OrderHistory from './OrderHistory/OrderHistory';
import "./Account.scss"
function Account(props) {

    return (
        <>
            <Container className='vh-100'>
                <div className='account-container pt-5'>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                        <Row>
                            <Col sm={3} >
                                <Nav variant="pills" className="flex-column border border-3 rounded-3" style={{ backgroundColor: "white" }}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Account detail</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Orders</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third">Change password</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9} >
                                <Tab.Content className='border border-3 rounded-3' style={{ backgroundColor: "white" }}>
                                    <Tab.Pane eventKey="first" ><AccountDetail /></Tab.Pane>
                                    <Tab.Pane eventKey="second"><OrderHistory /></Tab.Pane>
                                    <Tab.Pane eventKey="third"><ChangePassword /></Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>

            </Container>

        </>
    );
}

export default Account;