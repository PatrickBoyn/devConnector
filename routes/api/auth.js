const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')

// @route GET api/auth
// @desc test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await (await User.findById(req.user.id)).select('-password')
    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error.')
  }
})

// @route POST api/ auth
// @desc login user & get token.
// @access Public
router.post(
  '/',
  [
    check('email', 'Please  include a valid email address.').isEmail(),
    check('password', 'Password is required.').exists()
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })

      if (!user) {
        res.status(400).json({ errors: [{ message: 'User not found.' }] })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: 'User not found.' }] })
      }

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
