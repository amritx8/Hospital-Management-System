const patientGet = app.get('/patient', function (require, response) {

    let query = 'SELECT * FROM patient';

    connection.query(query, function (err, result) {

        if (err) {

            console.log(err);
            response.redirect('/');
        }
        else {

            response.render('patient', { patientData: result });
        }
    });
});

const addPatientGet = app.get('/addPatient', function (require, response) {

    response.render('addPatient');
});

const updatePatientGet = app.get('/updatePatient/:ID', function (require, response) {

    const ID = require.params.ID;

    const query = "SELECT * FROM patient WHERE patientID = '" + ID + "'";

    connection.query(query, function (err, result) {

        if (err) {

            console.log(err);
            response.send(err);
        }
        else {

            response.render('updatePatient', { patientData: result[0] });
        }
    });
});

const deletePatientGet = app.get('/deletePatient/:ID', function (require, response) {

    const ID = require.params.ID;

    const query = "DELETE FROM patient WHERE patientID = '" + ID + "'";

    connection.query(query, function (err, result) {

        if (err) {

            console.log(err);
            response.send(err);
        }
        else {

            response.redirect('/patient');
        }
    });
});

const addPatientPost = app.post('/addPatient', function (require, response) {

    const Name = require.body.patientName;
    const Age = require.body.patientAge;
    const PhoneNO = require.body.patientPhoneNo;

    let query = "INSERT INTO patient (patientName, patientAge, patientPhoneNo) VALUES ('" + Name + "','" + Age + "','" + PhoneNO + "')";

    connection.query(query, function (err, result) {

        if (err) {

            console.log(err);
            response.send('Error!');
        }
        else {

            response.redirect('/patient');
        }
    });
});

const updatePatientPost = app.post('/updatePatient', function (require, response) {

    const ID = require.body.patientID;
    const Name = require.body.patientName;
    const Age = require.body.patientAge;
    const PhoneNO = require.body.patientPhoneNo;

    const query = "UPDATE patient SET patientName = '" + Name + "', patientAge = '" + Age + "', patientPhoneNo = '" + PhoneNO + "' WHERE patientId = '" + ID + "'";

    connection.query(query, function (err, result) {

        if (err) {

            console.log(err);
            response.send('Error!');
        }
        else {

            response.redirect('/patient');
        }
    });
});

export {
    patientGet,
    addPatientGet,
    updatePatientGet,
    deletePatientGet,
    addPatientPost,
    updatePatientPost
};