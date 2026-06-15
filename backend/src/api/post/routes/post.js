'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/posts',
      handler: 'post.find',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/posts/:slug',
      handler: 'post.findOne',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
};