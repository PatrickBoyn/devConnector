const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route POST api/posts
// @desc Creates a post.
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Post cannot be empty.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await (await User.findById(req.user.id)).select('-password')

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      })

      const post = await newPost.save()

      res.json(post)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('There was a problem posting.')
    }
  }
)

// @route GET api/posts
// @desc Get all posts
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('There was a problem loading the posts.')
  }
})

// @route GET api/posts/:id
// @desc Get post by id
// @access Private

module.exports = router
