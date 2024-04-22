const webpack = require('webpack');
const path = require('path');

module.exports = {
  // Your existing webpack configuration options...

  devServer: {
    // Your existing devServer options...
    setupMiddlewares: (devServer) => {
      // Define your custom middleware setup here...

      // Example middleware to log incoming requests
      devServer.app.use((req, res, next) => {
        console.log(`Incoming request: ${req.method} ${req.url}`);
        next(); // Call next to pass the request to the next middleware in the chain
      });

      // Example middleware to modify response headers
      devServer.app.use((req, res, next) => {
        res.setHeader('X-Custom-Header', 'Value'); // Set custom response header
        next(); // Call next to pass the request to the next middleware in the chain
      });
    }
  }
};
