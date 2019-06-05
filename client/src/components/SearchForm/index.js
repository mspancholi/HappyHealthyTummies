import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./style.css";

class SearchForm extends Component {

    state = {
        useMyLocation: false,
        address: "",
        city: "",
        state: "",
        zipCode: "",
        food: ""
    }

    constructor(props) {
        console.log("SearchForm: constructor");
        super(props);
    }

    handleChangeUML = (event) => {
        console.log("SearchForm: handleChangeUML: value: " + event.target.checked);
        event.preventDefault();
        this.setState({ useMyLocation: event.target.checked });
        this.props.handleUMLCheck(event.target.checked);
    }

    handleChangeAddress = (event) => {
        //console.log("SearchForm: handleChangeAddress: value: " + event.target.value);
        this.setState({ address: event.target.value });
    }

    handleChangeCity = (event) => {
        //console.log("SearchForm: handleChangeCity: value: " + event.target.value);
        this.setState({ city: event.target.value });
    }


    handleChangeState = (event) => {
        //console.log("SearchForm: handleChangeState: value: " + event.target.value);
        this.setState({ state: event.target.value });
    }

    handleChangeZipCode = (event) => {
        //console.log("SearchForm: handleChangeZipCode: value: " + event.target.value);
        this.setState({ zipCode: event.target.value });
    }

    handleChangeFood= (event) => {
        //console.log("SearchForm: handleChangeFood: value: " + event.target.value);
        this.setState({ food: event.target.value });
    }

    handleSubmit = (event) => {
        console.log("SearchForm: handleSubmit");
        event.preventDefault();
        /* check to make sure correct values are set */

        this.props.handleSearchSubmit(this.state);
    }

    render() {
        return (
            <Card className="search-card">
                <Card.Title className="search-title" >Customize</Card.Title>
                <Card.Body>
                    <Form className="search-form" onSubmit={event => this.handleSubmit(event)}>
                        <Form.Group controlId="formLocationCheckbox">
                            <Form.Check type="checkbox" label="Use my location" value={this.state.useMyLocation} onChange={this.handleChangeUML}/>
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" value={this.state.address} onChange={this.handleChangeAddress}/>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" value={this.state.city} onChange={this.handleChangeCity}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formState">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="State" value={this.state.state} onChange={this.handleChangeState}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formZipCode">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="text" placeholder="Zip Code" value={this.state.zipCode} onChange={this.handleChangeZipCode}/>
                        </Form.Group>
                        <Form.Group controlId="formFood">
                            <Form.Label>Name of Food</Form.Label>
                            <Form.Control type="text" list="foods" placeholder="Name of Food" value={this.state.food} onChange={this.handleChangeFood}/>
                            <datalist id="foods">
                                <option>Pizza</option>
                                <option>Burger</option>
                                <option>Taco</option>
                                <option>Sushi</option>
                            </datalist>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={this.props.buttonsDisabled}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default SearchForm;