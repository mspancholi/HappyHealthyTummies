import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import Nav from "../components/Nav";
import nutrAPI from "../utils/nutrAPI";
import { Col, Row, Container } from "../components/Grid";
import SearchForm from "../components/SearchForm";
import PreferenceForm from "../components/PreferenceForm";
import ResultList from "../components/ResultList";
import dbAPI from "../utils/dbAPI";

class Nutrition extends Component {

    state = {
        userName: null,
        userID: null,
        buttonsDisabled: false,
        calories: 0,
        protein: 0,
        carbs: 0,
        sugars: 0,
        myLat: 0,
        myLng: 0,
        activeTab: "results",
        results: [],
        favs: [],
        redirect: false
    }

    constructor(props) {
        console.log("Nutrition: constructor");
        super(props);
        if (this.props.location.state) {
            this.state.userName = this.props.location.state.userName;
            this.state.userID = this.props.location.state.userID;
        }
        else {
            this.state.redirect  = true;
        }
    }


    loadFavorites = () => {
        dbAPI.getFavorite(this.state.userID)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    var favList = [];
                    for (var i in res.data) {
                        var obj = {
                            _id: res.data[i]._id,
                            userID: res.data[i].userID,
                            food: res.data[i].food,
                            brand: res.data[i].brand,
                            restaurant: res.data[i].restaurant,
                            location: res.data[i].location,
                            website: res.data[i].website,
                            address: res.data[i].address,
                            navigate: res.data[i].navigate
                        };
                        obj.favorite = {
                            _id: res.data[i]._id,
                            userID: res.data[i].userID,
                            food: res.data[i].food,
                            brand: res.data[i].brand,
                            restaurant: res.data[i].restaurant,
                            location: res.data[i].location,
                            website: res.data[i].website,
                            address: res.data[i].address,
                            navigate: res.data[i].navigate
                        };
                        favList.push(obj);
                    };
                    console.log("Nutrition: tabSelected: getFavorite: data[0]: " + JSON.stringify(res.data[0]));

                    this.setState({ favs: favList });
                }
            })
            .catch(err => (console.log("Nutrition: tabSelected: getFavorite: err: " + err)))
    }

    tabSelected = (eventKey, event) => {
        console.log("Nutrition: tabSelected on ResultsList: eventKey: " + eventKey + " event: " + event);
        this.setState({ activeTab: eventKey });
        if (eventKey === "favorites") {
            console.log("Nutrition: tabSelected: eventKey: favorites");
            // get favorites from db and populate list
            this.loadFavorites();
        }

    }

    // this is a callback function to getCurrentPosition() and will be called when user allows the system to trak his current position
    getPosition = (position) => {
        console.log("Nutrition: getPosition: Your Latitude :: " + position.coords.latitude);
        console.log("Nutrition: getPosition: Your Longitude :: " + position.coords.longitude);
        // set lat/lng
        this.setState({ myLat: position.coords.latitude, myLng: position.coords.longitude });
    }

    handleUMLCheck = (checked) => {
        if (checked) {
            navigator.geolocation.getCurrentPosition(this.getPosition);
        }
        else {
            this.setState({ myLat: 0, myLng: 0 });
        }
    }

    handleSaveButtonClick = (data) => {
        console.log("Nutrition: handleSaveButtonClick: data: " + JSON.stringify(data));
        var dbData = {
            userID: this.state.userID,
            food: data.food,
            brand: data.brand,
            restaurant: data.restaurant,
            location: data.location,
            website: data.website,
            address: data.address,
            navigate: data.navigate
        };
        dbAPI.addFavorite(dbData)
            .then(res => (console.log("Nutrition: handleSaveButtonClick: data added")))
            .catch(err => (console.log("Nutrition: handleSaveButtonClick: error adding data: " + err)));

    }

    handleDelButtonClick = (data) => {
        console.log("Nutrition: handleDelButtonClick: data: " + JSON.stringify(data));
        dbAPI.deleteFavorite(data._id)
            .then(res => {
                console.log("Nutrition: handleDelButtonClick: record deleted");
                this.loadFavorites();
            })
            .catch(err => (console.log("Nutrition: handleSaveButtonClick: error deleting data: " + err)));
    }

    handleSearchSubmit = (searchData) => {
        console.log("handleSearchSubmit: event: " + JSON.stringify(searchData));
        this.setState({ activeTab: "results" });
        var searchQuery = {
            useMyLocation: searchData.useMyLocation,
            address: searchData.address,
            city: searchData.city,
            state: searchData.state,
            zipCode: searchData.zipCode,
            food: searchData.food,
            calories: this.state.calories,
            protein: this.state.protein,
            carbs: this.state.carbs,
            sugars: this.state.sugars,
            lat: this.state.myLat,
            lng: this.state.myLng
        };


        // putting all logic to search on server side
        nutrAPI.search(searchQuery)
            .then(res => {
                console.log(JSON.stringify(res.data));
                if (res.data && res.data.consolidatedArr.length > 0) {
                    this.setState({
                        myLat: res.data.myLat,
                        myLng: res.data.myLng,
                        results: res.data.consolidatedArr
                    });
                }
                else {
                    // reset result list
                    var resultData = [];
                    this.setState({ results: resultData });
                }

            });

    }

    handlePreferenceChange = (userPreferences) => {
        console.log("handlePreferenceChange: userPreferences: " + JSON.stringify(userPreferences));
        this.setState({
            calories: userPreferences.calories,
            protein: userPreferences.protein,
            carbs: userPreferences.carbs,
            sugars: userPreferences.sugars
        });
    }

    renderRedirect = () => {
        console.log("Nutrition: renderRedirect");
        if (this.state.redirect) {
            console.log("calling redirect");
            return <Redirect to={{
                pathname: "/"
            }} ></Redirect>
        }
    }

    render() {
        return (
            <Container fluid>
                {this.renderRedirect()}
                <Row>
                    <Nav></Nav>
                </Row>
                <Row>
                    <Col size="md-5">
                        <SearchForm handleSearchSubmit={this.handleSearchSubmit}
                                    handleUMLCheck={this.handleUMLCheck}
                                    buttonsDisabled={this.state.buttonsDisabled} />
                    </Col>
                    <Col size="md-2"></Col>
                    <Col size="md-5">
                        <PreferenceForm handlePreferenceChange={this.handlePreferenceChange}
                                        userName={this.state.userName}
                                        userID={this.state.userID}
                                        buttonsDisabled={this.state.buttonsDisabled} />
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        <ResultList resultsData={this.state.results}
                            favData={this.state.favs}
                            myLat={this.state.myLat}
                            myLng={this.state.myLng}
                            activeTab={this.state.activeTab}
                            tabSelected={this.tabSelected}
                            saveButtonClick={this.handleSaveButtonClick}
                            delButtonClick={this.handleDelButtonClick} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Nutrition;