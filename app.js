const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql');
const { response } = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'Amritx8@',
    database: 'hms'
});

connection.connect(function(err) {
    
    if(err) {
        
        console.error('error: ' + err.message);
    }
    else {

        console.log('Connected to the MySQL server.');
    }
});

app.route('/manageDoctor/:AccessID/:Type/:ID?')
    .get(function (require, response) {

        const Type = require.params.Type;
        const AccessID = require.params.AccessID;
        const ID = require.params.ID;

        if (Type === 'view') {

            connection.query('SELECT * FROM doctor', function (error, result) {

                if (error) {

                    console.log(error);
                    response.send(error);
                }
                else {

                    response.render('viewDoctor', { AccessID: AccessID, data: result });
                }
            })
        }
        else if (Type === 'add') {

            response.render('addDoctor', { AccessID: AccessID });
        }
        else if (Type === 'update') {

            connection.query(`SELECT * FROM doctor WHERE ID = ${ID}`, function (err, result) {

                if (err) {

                    console.log(err);
                    response.send(err);
                }
                else {

                    response.render('updateDoctor', { AccessID: AccessID, data: result[0] });
                }
            });
        }
        else if (Type === 'delete') {

            connection.query(`DELETE FROM doctor WHERE ID = ${ID}`, function (err, result) {

                if (err) {

                    console.log(err);
                    response.send(err);
                }
                else {

                    response.redirect(`/manageDoctor/${AccessID}/view`);
                }
            });
        }
        else {

            response.send("Error!");
        }
    })
    .post(function (require, response) {

        const AccessID = require.params.AccessID;
        const Type = require.params.Type;
        let query;

        const { ID, name, email, phoneNumber, speciality } = require.body;

        if (Type == 'add') {

            query = `INSERT INTO doctor (name, email, phoneNumber, speciality) VALUES ('${name}', '${email}', ${phoneNumber}, '${speciality}')`;
        }
        else {

            query = `UPDATE doctor SET name = '${name}', email = '${email}', phoneNumber = ${phoneNumber}, speciality = '${speciality}' WHERE ID = ${ID}`;
        }

        connection.query(query, function (error, result) {

            if (error) {

                console.log(error);
                response.send(error);
            }
            else {

                response.redirect(`/manageDoctor/${AccessID}/view`);
            }
        })
    })

app.route('/manageReceptionist/:AccessID/:Type/:ID?')
    .get(function (require, response) {

        const Type = require.params.Type;
        const AccessID = require.params.AccessID;
        const ID = require.params.ID;

        if (Type === 'view') {

            connection.query('SELECT * FROM receptionist', function (error, result) {

                if (error) {

                    console.log(error);
                    response.send(error);
                }
                else {

                    response.render('viewReceptionist', { AccessID: AccessID, data: result });
                }
            })
        }
        else if (Type === 'add') {

            response.render('addReceptionist', { AccessID: AccessID });
        }
        else if (Type === 'update') {

            connection.query(`SELECT * FROM receptionist WHERE ID = ${ID}`, function (err, result) {

                if (err) {

                    console.log(err);
                    response.send(err);
                }
                else {

                    response.render('updateReceptionist', { AccessID: AccessID, data: result[0] });
                }
            });
        }
        else if (Type === 'delete') {

            connection.query(`DELETE FROM receptionist WHERE ID = ${ID}`, function (err, result) {

                if (err) {

                    console.log(err);
                    response.send(err);
                }
                else {

                    response.redirect(`/manageReceptionist/${AccessID}/view`);
                }
            });
        }
        else {

            response.send("Error!");
        }
    })
    .post(function (require, response) {

        const AccessID = require.params.AccessID;
        const Type = require.params.Type;
        let query;

        const { ID, name, email, phoneNumber } = require.body;

        if (Type == 'add') {

            query = `INSERT INTO receptionist (name, email, phoneNumber) VALUES ('${name}', '${email}', ${phoneNumber})`;
        }
        else {

            query = `UPDATE receptionist SET name = '${name}', email = '${email}', phoneNumber = ${phoneNumber} WHERE ID = ${ID}`;
        }

        connection.query(query, function (error, result) {

            if (error) {

                console.log(error);
                response.send(error);
            }
            else {

                response.redirect(`/manageReceptionist/${AccessID}/view`);
            }
        })
    })

app.route('/managePatient/:AccessID/:Type/:ID?')
    .get(function(require, response) {

        const Type = require.params.Type;
        const AccessID = require.params.AccessID;
        const ID = require.params.ID;

        if(Type === 'view') {

            connection.query('SELECT * FROM patient', function (error, result) {

                if (error) {

                    console.log(error);
                    response.send(error);
                }
                else {

                    response.render('viewPatient', { AccessID: AccessID, data: result});
                }
            })
        }
        else if(Type === 'add') {

            response.render('addPatient', { AccessID: AccessID });
        }
        else if(Type === 'update') {

            connection.query(`SELECT * FROM patient WHERE ID = ${ ID }`, function (err, result) {

                if (err) {

                    console.log(err);
                    response.send(err);
                }
                else {
                    
                    response.render('updatePatient', { AccessID: AccessID, data: result[0]});
                }
            });
        }
        else if(Type === 'delete') {

            connection.query(`DELETE FROM patient WHERE ID = ${ID}`, function (err, result) {

                if (err) {

                    console.log(err);
                    response.send(err);
                }
                else {

                    response.redirect(`/managePatient/${AccessID}/view`);
                }
            });
        }
        else {

            response.send("Error!");
        }
    })
    .post(function(require, response) {

        const AccessID = require.params.AccessID;
        const Type = require.params.Type;
        let query;

        const { ID, name, age, email, phoneNumber } = require.body;

        if(Type == 'add') {

            query = `INSERT INTO patient (name, age, email, phoneNumber) VALUES ('${name}', ${age}, ${email}, '${phoneNumber}')`;
        }
        else {

            query = `UPDATE patient SET name = '${name}', email = '${email}', phoneNumber = ${phoneNumber}, age = ${age} WHERE ID = ${ID}`;
        }

        connection.query(query, function (error, result) {

            if (error) {

                console.log(error);
                response.send(error);
            }
            else {

                response.redirect(`/managePatient/${AccessID}/view`);
            }
        })
    })

app.route('/manageAppointment/:AccessID/:Type/:ID?')
    .get(function (require, response) {

        const Type = require.params.Type;
        const AccessID = require.params.AccessID;
        const ID = require.params.ID;

        if (Type === 'view') {

            connection.query('SELECT * FROM appointment', function (error, result) {

                if (error) {

                    console.log(error);
                    response.send(error);
                }
                else {

                    response.render('viewAppointment', { AccessID: AccessID, data: result });
                }
            })
        }
        else if (Type === 'add') {

            response.render('addAppointment', { AccessID: AccessID });
        }
        else if (Type === 'update') {

            connection.query(`SELECT * FROM appointment WHERE ID = ${ID}`, function (err, result) {

                if (err) {

                    console.log(err);
                    response.send(err);
                }
                else {

                    response.render('updateAppointment', { AccessID: AccessID, data: result[0] });
                }
            });
        }
        else if (Type === 'delete') {

            connection.query(`DELETE FROM appointment WHERE ID = ${ID}`, function (err, result) {

                if (err) {

                    console.log(err);
                    response.send(err);
                }
                else {


                    response.redirect(`/manageAppointment/${AccessID}/view`);
                }
            });
        }
        else {

            response.send("Error!");
        }
    })
    .post(function (require, response) {

        const AccessID = require.params.AccessID;
        const Type = require.params.Type;
        let query;

        const { ID, patientID, doctorID, date, time } = require.body;

        console.log(date);

        if (Type == 'add') {

            query = `INSERT INTO appointment (patientID, doctorID, date, time) VALUES (${patientID}, ${doctorID}, '${date}', '${time}')`;
        }
        else {

            query = `UPDATE appointment SET patientID = ${patientID}, doctorID = ${doctorID}, date = '${date}', time = '${time}' WHERE ID = ${ID}`;
        }

        connection.query(query, function (error, result) {

            if (error) {

                console.log(error);
                response.send(error);
            }
            else {

                response.redirect(`/manageAppointment/${AccessID}/view`);
            }
        })
    })

app.get('/admin/:AccessID', function (require, response) {

    response.render('admin', { AccessID: require.params.AccessID});
})

app.get('/doctor/:AccessID',function (require, response) {

    const AccessID = require.params.AccessID;

    connection.query(`SELECT * FROM appointment WHERE doctorID = ${AccessID}`, function (err, result) {

        if (err) {

            console.log(err);
            response.send(err);
        } else {
            
            response.render('doctor', { AccessID: AccessID, data: result});
        }
    });
})

app.get('/receptionist/:AccessID', function (require, response) {

    response.render('receptionist', { AccessID: require.params.AccessID });
})

app.get('/detail/:AccessID/:Type', function(require, response) {

    const Type = require.params.Type;
    const AccessID = require.params.AccessID;

    connection.query(`SELECT * FROM ${Type}`, function (err, result) {

        if (err) {

            console.log(err);
            response.send(err);
        }
        else {

            response.render('detail', { AccessID: AccessID, Type: `${Type.charAt(0).toUpperCase() + Type.slice(1)}`, data: result });
        }
    });
});

app.route('/login')
    .get(function (require, response) {

        response.render('login', { AccessID: -1 });
    })
    .post(function (require, response) {

        const userType = require.body.userType.toLowerCase();
        const userID = require.body.userID;
        const userPassword = require.body.userPassword;

        connection.query(`SELECT * FROM ${userType} WHERE ID = ${userID}`, function (err, result) {

            if (err) {

                console.log(err);
                response.send(err);
            } else {

                const userData = result[0];

                if (userData.password == userPassword) {

                    response.redirect(`/${userType}/${userID}`);
                }
                else {

                    response.send("Not authorized");
                }
            }
        });
    })

app.get('/', function (require, response) {

    response.render('home', { AccessID: -1 });
});

app.listen(3000, function() {

    console.log('Working');
});