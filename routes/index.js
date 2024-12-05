let express = require('express');
let router = express.Router();
let app = express();
let database = require('../Database');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* GET Login page. */
router.get('/', function (req, res) {
    res.render('navbar', { title: 'Express', session: req.session });
});

/* GET Cancel page. */
router.get('/Cancel', function (req, res) {
    res.render('navbar', { title: 'Express', session: req.session });
});

/* Get SignUp Page */
router.get('/SignUp', function (req, res) {
    res.render('../views/index.ejs', { title: 'Express', session: req.session });
});

/* Post Register */
router.post('/login', function (request, response) {
    const email = request.body.email;
    const password = request.body.password;
    const querySql = 'INSERT INTO login (email, password) VALUES (?,?)';
    database.query(querySql, [email, password], function (error, data) {
        if (error) {
            console.error(error);
            response.status(500).send('Internal Server Error');
        } else {
            console.log(data);
            response.redirect('/marvel');
        }
    });
});
/* Post Register */

/* Get Website */
router.get('/iron', function (req, res) {
    res.render('../views/IronMan.ejs', { title: 'Express', session: req.session });
});
/* Get Website */
router.get('/spidy', function (req, res) {
    res.render('../views/Spidy.ejs', { title: 'Express', session: req.session });
});
/* Get Website */
router.get('/thor', function (req, res) {
    res.render('../views/thor.ejs', { title: 'Express', session: req.session });
});
/* Get Website */
router.get('/cap', function (req, res) {
    res.render('../views/cap.ejs', { title: 'Express', session: req.session });
});
/* Get Website */
router.get('/marvel', function (req, res) {
    res.render('../views/marvel.ejs', { title: 'Express', session: req.session });
});
/* Get Website */
router.get('/hulk', function (req, res) {
    res.render('../views/hulk.ejs', { title: 'Express', session: req.session });
});

/* Post Login Verify */
router.post('/loginVerify', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Retrieve email and password from database
    const sql = 'SELECT email, password FROM login WHERE email =?';
    database.query(sql, [email], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        } else if (results.length === 0) {
            res.status(401).send('Invalid email  password');
        } else {
            const dbPassword = results[0].password;
            // Compare password
            if (password === dbPassword) {
                // Log user in
                res.redirect('/marvel');
            } else {
                res.redirect('/');
            }
        }
    });
});
/* Post Login Verify */

module.exports = router