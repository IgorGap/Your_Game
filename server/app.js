const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
// const upload = require('./middlewares/middlewares');
const { User, Cat, Question, Game } = require('./db/models');
const Bcrypt = require('./utils/bcrypt');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));

const sessionConfig = {
  name: 'cook',
  secret: process.env.SECRET || 'thisisnotsecure',
  store: new FileStore(),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: true,
  saveUninitialized: false,
};

app.use(session(sessionConfig));

// settimout for response
// app.use((req, res, next) => {
//   req.setTimeout(20000, () => {
//     // call back function is called when request timed out.
//   });
//   next();
// });

app.get('/auth', async (req, res) => {
  try {
    const result = await User.findByPk(req.session.userId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('cook');
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.get('/cats', async (req, res) => {
  const cats = await Cat.findAll({raw: true});
	const questions = await Question.findAll({raw:true})
  res.json({cats, questions});
});

app.get('/cats/:id', async (req, res) => {
	const { id } = req.params;
  const question = await Question.findOne({ where: { id } });
  res.json(questions);
});


app.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const result = await User.create({ email, password: await Bcrypt.hash(password), name });
    if (result.id) {
      req.session.userName = result.name;
      req.session.userId = result.id;
      return res.json(result);
    }
    throw Error(result);
  } catch (error) {
    return res.json(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ where: { email } });
    if (await Bcrypt.compare(password, result.password)) {
      req.session.userName = result.name;
      req.session.userId = result.id;
      return res.json(result);
    }
    throw Error(result);
  } catch (error) {
    return res.json(error);
  }
});

app.listen(3003, () => {
  console.log('server start ', 3003);
});
