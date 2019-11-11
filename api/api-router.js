const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

let bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
	res.json({ api: "It's alive" });
});

router.post('/hash', (req, res) => {
  // read a password from the body
  const original = req.body.password;
  const credentials = req.body;
  // hash the password using bcryptjs
  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;
	// return it to the user in an object that looks like
	// { password: 'original passsword', hash: 'hashed password' }
	res.json({ originalPassword: original, hashedPassword: hash });
});

module.exports = router;