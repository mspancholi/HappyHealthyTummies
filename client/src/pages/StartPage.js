import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import Nav from "../components/Nav";
import AboutUs from "../components/AboutUs";
import { Row, Container } from "../components/Grid";

class StartPage extends Component {

    state = {
        userName: null,
        userID: null,
        loggedIn: false,
        redirect: false
    }

    onFacebookLogin = (loginStatus, resultObject) => {
        console.log("StartPage: onFacebookLogin: loginStatus=" + loginStatus);
        if (loginStatus === true) {
            console.log("userName: " + resultObject.user.name);
            console.log("userID:   " + resultObject.user.id);
            this.setState({ userName: resultObject.user.name,
                            userID: resultObject.user.id,
                            loggedIn: true });

        }
        else if (loginStatus === false) {
            console.log("need to reset");
            this.setState({ userName: null,
                            userID: null,
                            loggedIn: false });
        }
        else {
            //alert("Facebook login error");
            console.log("Facebook login error");
        }
    }

    handleEnterSiteClick = () => {
        console.log("StartPage: clicked Enter Site");
        this.setState({ redirect: true });
    }

    renderRedirect = () => {
        console.log("StartPage: renderRedirect");
        if (this.state.redirect) {
            console.log("calling redirect");
            return <Redirect to={{
                pathname: "/search",
                state: {userName: this.state.userName,
                        userID: this.state.userID}
            }} ></Redirect>
        }
    }


    render() {
        return (
            <Container fluid>
                {this.renderRedirect()}
                <Row>
                    <Nav onLogin={this.onFacebookLogin}></Nav>
                </Row>
                <Row>
                    <AboutUs onLogin={this.onFacebookLogin} onClick={this.handleEnterSiteClick} disabled={!(this.state.loggedIn)} image={"/images/healthy-foods-veggies.jpg"} title={"Heathly Food"} ></AboutUs>
                </Row>
            </Container>
        );
    }
}

export default StartPage;