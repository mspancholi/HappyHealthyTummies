require("dotenv").config();
var axios = require("axios");

// NUTRITIONIX
const app_key = process.env.NUTRITIONIX_APP_KEY;
const app_id = process.env.NUTRITIONIX_APP_ID;
const locationURL = "https://trackapi.nutritionix.com/v2/locations?ll=";
const siURL = "https://trackapi.nutritionix.com/v2/search/instant";

const limit = 50; // limiting results returned by Nutritionix
const distance = "10mi"; // limiting search radius 

// MAPQUEST
const mqLocationURL = "http://www.mapquestapi.com/geocoding/v1/address?key=";
const mq_key = process.env.MAPQUEST_CUSTOMER_KEY;

// this function looks into 2 array (Brand_Name_City_State_Website, si_Response)
// of json objects and return only the records common to both based on brand
function consolidateArray(si_Response, Brand_Name_City_State_Website) {

    var arrayList = [];
    // var results;

    for (var i in si_Response) {

        var obj = { food: si_Response[i].food };
        console.log("consolidatedArray: si_Response: " + JSON.stringify(si_Response[i]));

        for (var j in Brand_Name_City_State_Website) {
            if (Brand_Name_City_State_Website[j].brand === si_Response[i].brand) {
                obj.id = i;
                obj.favorite = { food: si_Response[i].food,
                                 brand: Brand_Name_City_State_Website[j].brand,
                                 restaurant: Brand_Name_City_State_Website[j].restaurant,
                                 location: Brand_Name_City_State_Website[j].location,
                                 website: Brand_Name_City_State_Website[j].website,
                                 address: Brand_Name_City_State_Website[j].address,
                                 navigate: Brand_Name_City_State_Website[j].loclat + ", " + Brand_Name_City_State_Website[j].loclng
                            };
                obj.brand = Brand_Name_City_State_Website[j].brand;
                obj.restaurant = Brand_Name_City_State_Website[j].restaurant;
                obj.location = Brand_Name_City_State_Website[j].location;
                obj.website = Brand_Name_City_State_Website[j].website;
                obj.distance = Brand_Name_City_State_Website[j].distance.toFixed(2);
                obj.address = Brand_Name_City_State_Website[j].address;
                obj.navigate = Brand_Name_City_State_Website[j].loclat + ", " + Brand_Name_City_State_Website[j].loclng;
                obj.loclat = Brand_Name_City_State_Website[j].loclat,
                obj.loclng = Brand_Name_City_State_Website[j].loclng
            }
        }

        arrayList.push(obj);
    }
    return arrayList;
}

function searchNutritionix(req, res, myLat, myLng) {
    var nLocationURL = locationURL + myLat + ',' + myLng + '&distance=' + distance + '&limit=' + limit;
    console.log("nutrController: search: nLocationURL: " + nLocationURL);
    //console.log("nutrController: req.body: " + JSON.stringify(req.body));
    axios({
        url: nLocationURL,
        headers: {
            'x-app-id': app_id,
            'x-app-key': app_key
        },
        method: 'GET',
        contentType: 'application/json'
    })
        .then(function (lResponse) {
            // javascript map method - goes through all locations from response and creates new array
            var brand_ids = lResponse.data.locations.map(function (locations) { return locations.brand_id });
            //console.log("nutrController: search: brand_ids: " + brand_ids);
            var Brand_Name_City_State_Website = lResponse.data.locations.map(function (locations) {
                return {
                    food: req.body.food,
                    brand: locations.brand_id,
                    restaurant: locations.name,
                    location: locations.city,
                    website: locations.website,
                    distance: locations.distance_km,
                    loclat: locations.lat,
                    loclng: locations.lng,
                    address: locations.address + ',\n' + locations.city + ', ' + locations.state + ' ' + locations.zip
                }
            })

            //console.log("BNCSW: " + JSON.stringify(Brand_Name_City_State_Website));

            // Need to do next AJAX call for search/instant/
            axios({
                url: siURL,
                headers: {
                    'x-app-id': app_id,
                    'x-app-key': app_key,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                data: {
                    "query": req.body.food,
                    "common": false,
                    "self": false,
                    "branded": true,
                    "brand_ids": brand_ids,
                    "detailed": true,
                    "full_nutrients": {
                        "203": {
                            "gte": req.body.protein.toString()
                        },
                        "269": {
                            "lte": req.body.sugars.toString()
                        },
                        "205": {
                            "lte": req.body.carbs.toString()
                        },
                        "208": {
                            "lte": req.body.calories.toString()
                        }
                    }
                }
            })
                .then(function (siResponse) {
                    //console.log("nutrController: search: siResponse: " + JSON.stringify(siResponse.data));
                        si_Response = siResponse.data.branded.map(function (branded) {
                            return {
                                food: branded.food_name,
                                brand: branded.nix_brand_id,
                                restaurant: branded.brand_name,
                                full_nutrient: branded.full_nutrients
                            }
                        });

                    //console.log("si_Response: " + JSON.stringify(si_Response));

                    var consolidatedArr = consolidateArray(si_Response, Brand_Name_City_State_Website);
                    // return value back to UI
                    console.log("nutrController: search: consolidatedArr: " + JSON.stringify(consolidatedArr));
                    var returnArr = {
                        consolidatedArr: consolidatedArr,
                        myLat: myLat,
                        myLng: myLng
                    };
                    res.json(returnArr);

                })
                .catch(err3 => {
                    console.log("nutrController: search: instant search err3: " + err3);
                    res.json(req.body);
                })

        })
        .catch(err2 => {
            console.log("nutrController: search: location err2: " + err2);
            res.json(req.body);
        })
}

// Defining methods for the searchController
module.exports = {

    search: function (req, res) {
        var myLat;
        var myLng;
        console.log("nutrController: req.data: " + JSON.stringify(req.body));

        if (req.body.useMyLocation) {
            console.log("nutrController: using myLocation");
            myLat = req.body.lat;
            myLng = req.body.lng;
            searchNutritionix(req, res, myLat, myLng);
        }
        else {
            // form mapquest key
            var reqAddress = "&location=" + req.body.address + "+" + req.body.city + "+" + req.body.state + "+" + req.body.zipCode;
            var searchLocationURL = mqLocationURL + mq_key + reqAddress;
            console.log("nutrController: search: searchLocationURL: " + searchLocationURL);
            axios({
                url: searchLocationURL,
                method: "GET"
            })
                .then(mqResponse => {
                    //console.log("nutrController: search: location: " + mqResponse.data.results[0].providedLocation.location);
                    //console.log("nutrController: search: lat: " + mqResponse.data.results[0].locations[0].latLng.lat);
                    //console.log("nutrController: search: long: " + mqResponse.data.results[0].locations[0].latLng.lng);
                    // Got Lat/Long so now call Nutritionix API
                    myLat = mqResponse.data.results[0].locations[0].latLng.lat;
                    myLng = mqResponse.data.results[0].locations[0].latLng.lng;
                    searchNutritionix(req, res, myLat, myLng);
                })
                .catch(err => {
                    console.log("nutrController: search: maquest err: " + err);
                    res.json(req.body);
                })
        }

    }
};