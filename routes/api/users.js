const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

// @route POST api/ users
// @desc Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required.')
      .not()
      .isEmpty(),
    check('email', 'Please  include a valid email address.').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({
      min: 6
    })
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    try {
      let user = await User.findOne({ email })

      if (user) {
        res.status(400).json({ errors: [{ message: 'User already exists.' }] })
      }

      const avatar = gravatar.url(email, {
        size: '200',
        rating: 'pg',
        default: 'mm'
      })

      user = new User({
        name,
        email,
        avatar,
        password
      })

      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        // TODO change to 3600 seconds.
        { expiresIn: 86400 },
        (error, token) => {
          if (error) throw error

          res.json({ token })
        }
      )
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error.')
    }
  }
)

module.exports = router
