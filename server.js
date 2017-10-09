const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Fix to Mongoose Promise depriciation
mongoose.Promise = global.Promise;

// Importing Mongoose Models
const Employee = require('./models/employee');

const app = express();

/* Connecting each request with MongoDB 
=============================================== */
mongoose.connect('mongodb://localhost/mean-data-table', {
    useMongoClient: true
}).then(() => {
    console.log('Connected successfully with the database');
}).catch((err) => {
    console.log('Error connecting to the database', err);
});

// Parsing the POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // Parsing URL-encoded data using query string library

// Serving the static files in the 'dist' directory
app.use(express.static(__dirname + '/dist'));

// Setting up the middleware to always serve index.html file
app.use('/', (err, req, res, next) => {
    console.log('Inside default route');
    res.sendFile(path.join(__dirname, 'dist/index.html'));
    next();
});

/* Setting up MongoDB API routes
==================================================== */
app.post('/fill-db', (req, res) => {

    console.log('Inside fill db route');

    const data = req.body;

    for(let i = 0; i < data.length; i++) {

        const employee = new Employee({name: data[i].name, age: data[i].age, city: data[i].city});
        employee.save();

    }

});

app.post('/fetch-employees', (req, res) => {

    console.log('Inside fetch employees route');
    data = req.body;
    let employeeCount;

    // Checking is the searched text is Not A Number
    if(isNaN(+data.searchText)) {

        // console.log(data.searchText);

        Employee.count({}).then((count) => {
            employeeCount = count;
            Employee.find({$or: [{'name': {$regex: '.*' + data.searchText + '.*', $options: 'i'}}, {'city': {$regex: '.*' + data.searchText + '.*', $options: 'i'}}]}).sort(data.sortOptions).skip(data.offset).limit(data.rowCount).exec().then((result) => {
                res.status(200).json({
                    title: 'Fetched Employees',
                    obj: result,
                    count: employeeCount
                });
            }).catch((err) => {
                res.status(500).json({
                    title: 'Error fetching employees',
                    error: err
                });
            });
        }).catch((err) => {
            res.status(500).json({
                title: 'Error fetching employees',
                error: err
            });
        });

    } else if(+data.searchText > 0) {   // If the searched text is a number
        
        Employee.count({}).then((count) => {
            employeeCount = count;
            Employee.find({age: +data.searchText}).sort(data.sortOptions).skip(data.offset).limit(data.rowCount).exec().then((result) => {
                res.status(200).json({
                    title: 'Fetched Employees',
                    obj: result,
                    count: employeeCount
                });
            }).catch((err) => {
                res.status(500).json({
                    title: 'Error fetching employees',
                    error: err
                });
            });
        }).catch((err) => {
            res.status(500).json({
                title: 'Error fetching employees',
                error: err
            });
        });

    } else {  // Finding all the records

        Employee.count({}).then((count) => {
            employeeCount = count;
            Employee.find({}).sort(data.sortOptions).skip(data.offset).limit(data.rowCount).exec().then((result) => {
                res.status(200).json({
                    title: 'Fetched Employees',
                    obj: result,
                    count: employeeCount
                });
            }).catch((err) => {
                res.status(500).json({
                    title: 'Error fetching employees',
                    error: err
                });
            });
        }).catch((err) => {
            res.status(500).json({
                title: 'Error fetching employees',
                error: err
            });
        });
    }

});

// Catch all other routes and return the index file always
app.get('/*', (req, res) => {
    console.log('Inside wildcard route');
    console.log(req.body);
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Listening on PORT
app.listen(process.env.PORT || 8000);
