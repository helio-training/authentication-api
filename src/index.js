import Express from 'express';
import Parser from 'body-parser';
import Passport from 'passport';

// import { Strategy } from 'passport-local';

// import { BasicStrategy } from 'passport-http';
import { Strategy } from 'passport-http-bearer';
// const LocalStrategy = PassportLocal.Strategy;
// const LocalStrategy = require('passport-local').Strategy;


const app = Express();
app.use(Parser.json());


// Passport.use(new BasicStrategy((username, password, done) => {
//   console.log(username);
//   console.log(password);
//   return done(null, { username });
// }));

Passport.use(new Strategy((token, done) => {
  console.log(token);
  if (token === '123123') {
    return done(null, { token }); // What is a user? { username: 'Tyler', isActive: true }
  } else {
    return done('Wrong username/password');
  }
}));


app.get('/', (req, res) => {
  return res.json({ message: 'Hello' });
});

app.post('/login',
  (req, res) => {
    console.log(req.headers);
    return res.json({ token: '123123' });
  });

app.get('/users', Passport.authenticate('bearer', { session: false }), (req, res) => {
  console.log(req.user);
  return res.json([]);
});


app.listen(3000, () => {
  console.log(`Application has started`);
});


export default app;
