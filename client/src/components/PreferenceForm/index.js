import React, { Component } from "react";
//import ReactDOM from 'react-dom';
//import ReactDrawer from 'react-drawer';
import Collapsible from 'react-collapsible';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import dbAPI from "../../utils/dbAPI";

/* if you using webpack, should not apply identity to this css */
import 'react-drawer/lib/react-drawer.css';

import "./style.css";

class PreferenceForm extends Component {

    state = {
        open: false,
        position: "right",
        noOverlay: true,
        calories: "",
        carbs: "",
        protein: "",
        sugars: "",
        disabled: true,
        buttonText: "Edit"
    }

    constructor(props) {
        console.log("PreferenceForm: constructor");
        super(props);
    }

    componentDidMount() {
        console.log("PreferenceForm: componentDidMount");
        this.loadUserData();
    }

    componentDidUpdate(prevProps) {
        console.log("PreferenceForm: componentDidUpdate: props.id: " + this.props.userID + " prevProps.id: " + prevProps.userID);
        // Typical usage (don't forget to compare props):
        if (this.props.userID !== prevProps.userID) {
            this.loadUserData();
        }
    }

    handleButtonClick = (event) => {
        event.preventDefault();
        if (this.state.disabled) { // user wants to edit
            console.log("PreferenceForm: handleButtonClick: editing");
            this.setState({ disabled: false, buttonText: "Save" });
        }
        else { // user clicked save so updated db
            console.log("PreferenceForm: handleButtonClick: saving");
            this.setState({ disabled: true, buttonText: "Edit" });
            this.updateUserData();
        }
    }

    updateUserData = () => {
        if (!this.props.userID) {
            console.log("PreferenceForm: updateUserData: userID not set");
            return;
        }

        let userData = {
            userID: this.props.userID,
            userName: this.props.userName,
            calories: this.state.calories,
            protein: this.state.protein,
            carbs: this.state.carbs,
            sugars: this.state.sugars
        };

        dbAPI.updateUser(userData)
            .then(res => {
                console.log("PreferenceForm: updateUserData: updated");
            })
            .catch(err => {
                console.log("PreferenceForm: updateUserData: err: " + err);
            });
    }

    loadUserData = () => {
        if (!this.props.userID) {
            console.log("PreferenceForm: loadUserData: userID not set");
            return;
        }

        dbAPI.getUser(this.props.userID)
            .then(res => {
                console.log("RES: " + JSON.stringify(res));
                if (!res.data) { // didn't find so create record
                    console.log("PreferenceForm: loadUserData: did not find so create with default values");
                    let userData = {
                        userID: this.props.userID,
                        userName: this.props.userName,
                        calories: 1000,
                        protein: 10,
                        carbs: 50,
                        sugars: 30
                    };
                    dbAPI.createUser(userData)
                        .then(res => {
                            console.log("loadUserData: created new user: " + JSON.stringify(res.data));
                            this.setState({
                                calories: res.data.calories,
                                carbs: res.data.carbs,
                                protein: res.data.protein,
                                sugars: res.data.sugars
                            })
                            this.props.handlePreferenceChange(res.data);
                        })
                        .catch(err => (console.log("error creating User: " + err)));
                }
                else {
                    console.log("PreferenceForm: loadUserData: found user: " + JSON.stringify(res.data));
                    this.setState({
                        calories: res.data.calories,
                        carbs: res.data.carbs,
                        protein: res.data.protein,
                        sugars: res.data.sugars
                    })
                    this.props.handlePreferenceChange(res.data);
                }
            })
            .catch(err => console.log(err));
    };

    onChangeCalories = (event) => {
        this.setState({ calories: event.target.value });
    }

    onChangeCarbs = (event) => {
        this.setState({ carbs: event.target.value });
    }

    onChangeProtein = (event) => {
        this.setState({ protein: event.target.value });
    }

    onChangeSugars = (event) => {
        this.setState({ sugars: event.target.value });
    }

    toggleDrawer = () => {
        this.setState({ open: !this.state.open });
    }

    closeDrawer = () => {
        this.setState({ open: false });
    }
    onDrawerClose = () => {
        this.setState({ open: false });
    }

    /*
    <div>
        <div style={{ margin: 0 }}>
            <button
                className={"btn"}
                style={{ margin: 0 }}
                onClick={this.toggleDrawer}
                disabled={this.state.open && !this.state.noOverlay} >
                    <i className="fa fa-bars"></i>
            </button>
        </div>
        <ReactDrawer open={this.state.open}
            position={this.state.position}
            onClose={this.onDrawerClose}
            noOverlay={this.state.noOverlay}>
            <i onClick={this.closeDrawer} className="icono-cross"></i>
                // put card stuff here
        </ReactDrawer>
    </div>
    */

    render() {
        return (
            <Card className="preference-card" >
                <Card.Title className="preference-title" >
                    Preference
                </Card.Title>
                <Card.Body>
                    <Form className="preference-form" onSubmit={event => this.handleButtonClick(event)}>
                        <Form.Group as={Row} controlId="formCalories">
                            <Form.Label column sm={4}>Calories</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text" placeholder="" value={this.state.calories} onChange={this.onChangeCalories} disabled={this.state.disabled} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formCarbs">
                            <Form.Label column sm={4}>Carbs</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text" placeholder="" value={this.state.carbs} onChange={this.onChangeCarbs} disabled={this.state.disabled} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formProtein">
                            <Form.Label column sm={4}>Protein</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text" placeholder="" value={this.state.protein} onChange={this.onChangeProtein} disabled={this.state.disabled} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formSugars">
                            <Form.Label column sm={4}>Sugars</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text" placeholder="" value={this.state.sugars} onChange={this.onChangeSugars} disabled={this.state.disabled} />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={this.props.buttonsDisabled}>
                            {this.state.buttonText}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default PreferenceForm;