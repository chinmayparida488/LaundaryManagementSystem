var con = require('./connection');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'hbs');

// app.get("/", (req, res) => {
//       res.render('index');
// });

app.get('/', (req, res) => {
      res.sendFile(__dirname+'/register.html');
});

app.get('/login.html', (req, res) => {
      res.sendFile(__dirname+'/login.html');
});

app.get('/laundary_request_form.html', (req, res) => {
      res.sendFile(__dirname+'/laundary_request_form.html');
});

// app.get('/views/index', (req, res) => {
//       res.sendFile(__dirname+'/views/index');
// });


app.post('/', (req, res)=>{
      var fullName = req.body.fullname;
      var email = req.body.email;
      var mobile = req.body.mobile;
      var password = req.body.password;

      con.connect((err) => {
            if (err) throw err;
            var sql = `INSERT INTO register(fullName, email, mobileNumber, password) values("${fullName}", "${email}", "${mobile}", "${password}")`;

            con.query(sql, (err, result) => {
                  if (err) throw err;
                  res.redirect('/login.html');
            })
      })
});

app.post('/login.html', (req, res) => {
      var email = req.body.email;
      var password =req.body.password;

      con.connect((err) => {
            if(err) throw err;
            var sql = `SELECT * FROM register WHERE email = "${email}"`;

            con.query(sql, (err, result) => {
                  if(err) throw err;
                  else if(password == result[0].password){
                        var sql = `SELECT * FROM request WHERE email = "${email}"`;
                        con.query(sql, (err, result) => {
                              if(result.length==0){
                                    res.render('index');
                              }
                              
                              // if(err){
                              //       res.redirect('/views/index.hbs');
                              // }
                              
                              else{
                                    console.log(result);
                                    res.render('index', {
                                          date: result[0].date,
                                          topwear: result[0].topwear,
                                          bottomwear: result[0].bottomwear,
                                          serviceType: result[0].serviceType,
                                    });
                              }
                              
                        })

                        // res.render('index', {});
                  }
                  // else{
                  //       res.redirect('/login.html');
                  // }
            });
      });
});


app.post('/laundary_request_form.html', (req, res)=>{
      // console.log(req.body);
      var date = req.body.date;
      var topwear = req.body.topwear;
      var bottomwear = req.body.bottomwear;
      var serviceType = req.body.serviceType;
      var email = req.body.email;

      con.connect((err) => {
            if (err) throw err;
            var sql = `INSERT INTO request(date, topwear, bottomwear, serviceType, email) values("${date}", "${topwear}", "${bottomwear}", "${serviceType}", "${email}")`;

            con.query(sql, (err, result) => {
                  if (err) throw err;
                  res.render('index');
            })
      })
});

// app.get('/view', (req, res) => {
//       con.connect((err) => {
//             if(err) console.log(err);

//             var sql = 'SELECT * FROM request';

//             con.query(sql, (err, result) => {
//                   if(err) console.log(err);
//                   res.render("/view");
//             });
//       });
// });

app.listen(7000);