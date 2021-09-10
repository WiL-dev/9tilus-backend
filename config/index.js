require('dotenv').config()

module.exports = {
  port: process.env.APP_PORT || 4000,
  tumblr_key: process.env.TUMBLR_KEY,
  tumblr_secret: process.env.TUMBLR_SECRET,
  tumblr_token: process.env.TUMBLR_TOKEN,
  tumblr_token_secret: process.env.TUMBLR_TOKEN_SECRET,
  tumblr_blog_name: process.env.TUMBLR_BLOG_NAME,
}