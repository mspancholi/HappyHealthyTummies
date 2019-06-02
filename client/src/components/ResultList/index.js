import React, { Component } from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ReactTable from 'react-table';
import "react-table/react-table.css";


import "./style.css";

class ResultList extends Component {

    columnsResults = [
        {
            Header: "Fav",
            accessor: "favorite",
            width: 55,
            Cell: ({ value }) => (<button className="favBtn" onClick={() => this.handleSaveButtonClick(value)}>Save</button>)
        },
        {
            Header: "Food",
            accessor: "food",
            width: 300
        },
        {
            Header: "Restaurant",
            accessor: "restaurant",
            width: 150
        },
        {
            Header: "Location",
            accessor: "location",
            width: 150
        },
        {
            Header: "Distance",
            accessor: "distance",
            width: 100
        },
        {
            Header: "Address",
            accessor: "address"
        },
        {
            Header: "Nav",
            accessor: "navigate",
            width: 55,
            Cell: ({ value }) => (<button className="mapBtn" onClick={() => this.handleMapButtonClick(value)}></button>)
        }
    ];

    columnsFav = [
        {
            Header: "Fav",
            accessor: "favorite",
            width: 55,
            Cell: ({ value }) => (<button className="favBtn" onClick={() => this.handleDelButtonClick(value)}>Del</button>)
        },
        {
            Header: "Food",
            accessor: "food",
            width: 300
        },
        {
            Header: "Restaurant",
            accessor: "restaurant",
            width: 150
        },
        {
            Header: "Location",
            accessor: "location",
            width: 150
        },
        {
            Header: "Distance",
            accessor: "distance",
            width: 100
        },
        {
            Header: "Address",
            accessor: "address"
        },
        {
            Header: "Nav",
            accessor: "navigate",
            width: 55,
            Cell: ({ value }) => (<button className="mapBtn" onClick={() => this.handleMapButtonClick(value)}></button>)
        }
    ];



    constructor(props) {
        console.log("ResultList: constructor");
        super(props);
    }

    handleSaveButtonClick = (value) => {
        console.log("ResultList: handleSaveButtonClick: " + JSON.stringify(value));
        this.props.saveButtonClick(value);
    }

    handleDelButtonClick = (value) => {
        console.log("ResultList: handleDelButtonClick: " + JSON.stringify(value));
        this.props.delButtonClick(value);
    }

    handleMapButtonClick = (value) => {
        console.log("ResultList: handleMapButtonClick: value: " + value);
        console.log("myLat: " + this.props.myLat);
        console.log("myLng: " + this.props.myLng);
        
        var gMapURL = "https://www.google.com/maps/dir/?api=1&origin=" + this.props.myLat + "," + this.props.myLng +
            "&destination=" + value + "&travelmode=car";
        window.open(gMapURL, "_blank");
    }

    render() {
        return (
            <Tabs defaultActiveKey="favorites" className="results-tab" onSelect={this.props.tabSelected} activeKey={this.props.activeTab}>
                <Tab eventKey="results" title="Results">
                    <ReactTable className="-striped" data={this.props.resultsData} columns={this.columnsResults} defaultPageSize={10} />
                </Tab>
                <Tab eventKey="favorites" title="Favorites">
                    <ReactTable className="-striped" data={this.props.favData} columns={this.columnsFav} defaultPageSize={10} />
                </Tab>
            </Tabs>
        );
    }
}

export default ResultList;