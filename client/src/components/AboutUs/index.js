import React from "react";
import { Col, Row, Container } from "../Grid";
import FacebookLoginButton from '../FacebookLoginButton';

import "./style.css";

function AboutUs(props) {
    return (
        <Container fluid>
            <div className="top-div">
                <div className="bg">
                </div>
                <div className="overlay-text">
                    <Row>
                        <Col size="md-4"></Col>
                        <Col size="md-4">
                            <h1>Our Story</h1>
                        </Col>
                        <Col size="md-4"></Col>
                    </Row>
                    <Row>
                        <Col size="md-4"></Col>
                        <Col size="md-4">
                            <div className="facebook-button">
                                <FacebookLoginButton onLogin={props.onLogin}>
                                    <div className="fb-login-button" data-show-faces="false" data-size="medium" data-button-type="login_with" data-auto-logout-link="true" data-use-continue-as="false" ></div>
                                </FacebookLoginButton>
                            </div>
                        </Col>
                        <Col size="md-4"></Col>
                    </Row>
                    <Row>
                        <Col size="md-4"></Col>
                        <Col size="md-4">
                            <button onClick={props.onClick} disabled={props.disabled} >Begin Search</button>
                        </Col>
                        <Col size="md-4"></Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
}

export default AboutUs;