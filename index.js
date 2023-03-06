// const express = require('express');

// //server
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// //get endpoint
// app.get('/contact', (req,res) => {
// res.render('Contact');
// });

// app.post('/contact', (req, res) => {
//     const { name, email, phone, age } = req.body;
//     console.log(`New contact form submission: ${name}, ${email}, ${phone}, ${age}`);
//     res.send('Thank you for contacting us!');
// });

// app.listen(6000, () =>{
//   console.log('Server started on port 6000');
// });

// const express = require('express');
// const app = express();
// const pool = require('./database');

// // Set up Handlebars as the view engine
// const hbs = require('hbs');
// app.set('view engine', 'hbs');
// app.set('views', __dirname + '/templates/views');

// // Parse the request body as JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Define a GET endpoint for the contact form
// app.get('/contact', (req, res) => {
//   res.render('contact');
// });


// ^^ above code was a trial run 

const express = require('express');
const app = express();
const pool = require('./test/database');

// Set up Handlebars as the view engine
const hbs = require('hbs');

//app.engine('handlebars', engine());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/templates/views');


// Parse the request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define a GET endpoint for the contact form
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Define a POST endpoint for submitting the contact form
app.post('/contact', async (req, res) => {
  const { name, email, phone, comment } = req.body; // originally had age instead of comment field
  console.log(`New contact form submission: ${name}, ${email}, ${phone}, ${comment}`);
  try {
    const conn = await pool.getConnection();
    const [rows, fields] = await conn.execute(
      'INSERT INTO contacts (name, email, phone, comment) VALUES (?, ?, ?, ?)',
      [name, email, phone, comment]
    );
    console.log(`Inserted ${rows.affectedRows} row(s)`);
    conn.release();
    res.send('Thanks for contacting us!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// start server
app.listen(8080, () => {
  console.log('Server started on port 8080');
});

