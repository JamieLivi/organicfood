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
	STORAGE_VEGGIECONTENTSTORAGE_BUCKETNAME
	STORAGE_VEGGIETABLE_NAME
	STORAGE_VEGGIETABLE_ARN
	STORAGE_VEGGIETABLE_STREAMARN
	test
Amplify Params - DO NOT EDIT */

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const idGen = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**********************
 * Example get method *
 **********************/

app.get('/items', function (req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/items/*', function (req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
 * Example post method *
 ****************************/

// app.post('/items', function (req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body});
// });

app.post('/items', function (req, res) {
  const {name, info, subtitle, image} = req.body;
  var params = {
    TableName: process.env.STORAGE_VEGGIETABLE_NAME,
    Item: {
      id: idGen(),
      name,
      info,
      subtitle,
      image,
      date: new Date().toISOString(),
    },
  };
  docClient.put(params, function (err, data) {
    if (err) res.json({err});
    else res.json({success: 'contact post call succeed!'});
  });
});

app.post('/items/*', function (req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body});
});

/****************************
 * Example put method *
 ****************************/

app.put('/items', function (req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body});
});

app.put('/items/*', function (req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body});
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/items', function (req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/items/*', function (req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
