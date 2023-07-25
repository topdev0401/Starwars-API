/**
 * Handles error by printing to console and sends an error response back
 * @param {Object} res response object
 * @param {*} err error object
 */

const handleError = (res, err) => {
  // Sends error to user
  
  res.status(err.response.status).json({
    errors: {
      msg: err.message,
    },
  });
};

module.exports = {
  handleError,
};
