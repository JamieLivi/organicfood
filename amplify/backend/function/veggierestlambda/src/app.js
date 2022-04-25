/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	API_VEGGIES_GRAPHQLAPIIDOUTPUT
	API_VEGGIES_VEGTABLE_ARN
	API_VEGGIES_VEGTABLE_NAME
	ENV
	REGION
	STORAGE_VEGGIESTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
AWS.config.update({region: process.env.TABLE_REGION});
const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = process.env.API_VEGGIES_VEGTABLE_NAME;
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/items/*', function (req, res) {
  let queryParams = {
    TableName: tableName,
  };
  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});

app.listen(3000, function () {
  console.log('App started');
});

module.exports = app;
