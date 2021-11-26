/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

module.exports = { asyncWrapper };
