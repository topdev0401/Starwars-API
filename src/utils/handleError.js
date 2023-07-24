/**
 * Handles error by printing to console and sends an error response back
 * @param {Object} res response object
 * @param {*} err error object
 */

const handleError = (res, err) => {
  // Prints error in console
  console.error(err);

  // Sends error to user
  res.status(err.code).json({
    errors: {
      msg: err.message,
    },
  });
};

module.exports = {
  handleError,
};
