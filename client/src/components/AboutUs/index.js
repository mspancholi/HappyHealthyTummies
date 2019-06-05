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
                <Row>
                    <Col size="md-3"></Col>
                    <Col size="md-6" >
                        <div className="overlay-text">
                            <Row>
                                <Col size="md-12" >
                                    <h1>What We Do</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-12">
                                    <p> 
                                    We provide nutrition conscience individuals, who lead busy lives who may not have time to make a meal, an easy way to find food from restaurants near a location you specify based on your personal nutritional information.   
                                    A perfect solution for busy adults, traveling individuals, and simply finding food when out and about that stays within your specific nutritional requirements.
                                    <br></br>
                                    <br></br>
                                    <h3>How it works</h3>
                                    Sign in or start a new account and fill out your personal nutritional information in the required fields to begin.  
                                    <br></br>
                                    Enjoy Happy Healthy Tummies!
                                    </p>
                                   
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-12">
                                    <p id="clickInstructions">
                                        Login via Facebook and then click "Begin Search" to begin the journey
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-12" >
                                    <div className="facebook-button">
                                        <FacebookLoginButton onLogin={props.onLogin}>
                                            <div className="fb-login-button" data-show-faces="false" data-size="medium" data-button-type="login_with" data-auto-logout-link="true" data-use-continue-as="false" ></div>
                                        </FacebookLoginButton>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-12" >
                                    <button className="beginBtn" onClick={props.onClick} disabled={props.disabled} >Begin Search</button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col size="md-3"></Col>
                </Row>
            </div>
        </Container>
    );
}

export default AboutUs;