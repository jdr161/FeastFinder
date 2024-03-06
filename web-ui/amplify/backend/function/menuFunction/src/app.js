/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	DB_CONNECTION_STRING
	DB_CONNECTION_PORT
	DB_USER
	DB_PASSWORD
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/**********************
 * DB Connection *
 **********************/

var dbConnectionErrorFlag = false;
const { Client } = require('pg')
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_CONNECTION_STRING,
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: 5432,
})
client.connect(function(err) {
  if (err) {
    console.log("error connecting to database: ")
    console.log(err.stack)
    dbConnectionErrorFlag = true;
  }
});

/**********************************************************
 * Function to create the query string, make the request
 * to the database, and return the response
 **********************************************************/
async function doMenuQuery(formattedDate, res){
  let query = 
  `SELECT 
    locations.cafe_name, 
    items.itemname, 
    items.kcal, 
    stations.stationname, 
    services.servicename 
  FROM menuitems
    JOIN locations on menuitems.cafeid=locations.cafeid
    JOIN items on menuitems.itemid=items.itemid
    JOIN stations on menuitems.stationid=stations.stationid
    JOIN services on menuitems.serviceid=services.serviceid
  WHERE menuitems.date = '${formattedDate}'`;
  try {
    let data = await client.query(query);
    res.json({success: 'retrieved data successfully', data: data.rows});
  } catch (error) {
    console.log(`issue executing query: ${query}`)
    console.log(error.stack)
    res.status(500).json({failuer: "Issue with database query"})
  }
}

/**********************
 * get method *
 **********************/

//Default menu endpoint will return the menu for the current day
app.get('/menu', function(req, res) {
  if(dbConnectionErrorFlag){
    res.status(500).json({failure: "Issue connecting to database"})
  } else {
    doMenuQuery(new Date().toISOString().split('T')[0], res);
  }
});

/*
Menu endpoint with additional information will parse for date and 
return menu for that date.
*/
app.get('/menu/*', function(req, res) {
  if(dbConnectionErrorFlag){
    res.status(500).json({failure: "Issue connecting to database"})
  } else {
    let date = req.params[0];
    let parsedDate = Date.parse(date);
    if(parsedDate){
      doMenuQuery(new Date(parsedDate).toISOString().split('T')[0], res);
    } else {
        res.status(400).json({failure: `Incorrectly formatted date: ${req.params[0]}. Follow format YYYY-MM-DD`})
    }
  }
});

/****************************
* post method *
NOT ALLOWED FOR MENU ENDPOINT
****************************/

app.post('/menu', function(req, res) {
  // Add your code here
  res.status(405).json({failure: 'Method not allowed', url: req.url, body: req.body})
});

app.post('/menu/*', function(req, res) {
  // Add your code here
  res.status(405).json({failure: 'Method not allowed', url: req.url, body: req.body})
});

/****************************
* Example put method *
NOT ALLOWED FOR MENU ENDPOINT
****************************/

app.put('/menu', function(req, res) {
  // Add your code here
  res.status(405).json({failure: 'Method not allowed', url: req.url, body: req.body})
});

app.put('/menu/*', function(req, res) {
  // Add your code here
  res.status(405).json({failure: 'Method not allowed', url: req.url, body: req.body})
});

/****************************
* Example delete method *
NOT ALLOWED FOR MENU ENDPOINT
****************************/

app.delete('/menu', function(req, res) {
  // Add your code here
  res.status(405).json({failure: 'Method not allowed', url: req.url});
});

app.delete('/menu/*', function(req, res) {
  // Add your code here
  res.status(405).json({failure: 'Method not allowed', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
