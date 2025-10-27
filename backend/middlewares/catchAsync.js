module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error("Controller error:", err); // <-- Add this line
    next(err);
  });
};