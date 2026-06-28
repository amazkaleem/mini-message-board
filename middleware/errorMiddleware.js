async function handleError(err, req, res, next) {
  console.error(err);
  // We can now specify the `err.statusCode` that exists in our custom error class and if it does not exist it's probably an internal server error
  res.status(err.statusCode || 500).send(`<h1>${err.message}</h1>`);
};

export default handleError;