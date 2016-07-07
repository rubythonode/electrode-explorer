"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actions = require("../types/actions");

var types = _interopRequireWildcard(_actions);

var _constants = require("../types/constants");

var constants = _interopRequireWildcard(_constants);

var _helpers = require("../helpers/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  autoRenew: true,
  cardInfo: { type: "VISA", digits: "0000" },
  cardStatus: constants.VALID,
  errorMessage: false,
  loading: true,
  modalContent: undefined,
  renewalDate: "January 1, 2017",
  successMessage: false,
  trialStatus: true
};

var subscriptionStatus = function subscriptionStatus() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var _ref = arguments[1];
  var pl = _ref.payload;
  var type = _ref.type;


  switch (type) {

    case types.GET_MODAL_INFO_SUCCESS:
      return (0, _extends3.default)({}, state, { modalContent: { __html: pl } });

    // GET SUBSCRIPTION STATUS
    case types.GET_SUBSCRIPTION_STATUS_REQUEST:
      return (0, _extends3.default)({}, state, { loading: true });

    case types.GET_SUBSCRIPTION_STATUS_SUCCESS:
      return (0, _extends3.default)({}, state, {
        autoRenew: pl.autoRenew,
        cardInfo: pl.cardInfo,
        cardStatus: pl.cardStatus,
        errorMessage: false,
        loading: false,
        renewalDate: (0, _helpers.formatDate)(pl.expiryDate),
        trialStatus: (0, _helpers.checkLifecycleStatus)(pl.lifecycleStatus)
      });

    case types.GET_SUBSCRIPTION_STATUS_ERROR:
      return (0, _extends3.default)({}, state, {
        errorMessage: constants.GET_SUBSCRIPTION_STATUS,
        loading: false,
        successMessage: false
      });

    // UPDATE AUTO RENEW
    case types.UPDATE_AUTO_RENEW_REQUEST:
      return (0, _extends3.default)({}, state, { loading: true });

    case types.UPDATE_AUTO_RENEW_SUCCESS:
      return (0, _extends3.default)({}, state, {
        autoRenew: pl.autoRenew,
        cardInfo: pl.cardInfo,
        cardStatus: pl.cardStatus,
        errorMessage: false,
        loading: false,
        renewalDate: (0, _helpers.formatDate)(pl.expiryDate),
        trialStatus: (0, _helpers.checkLifecycleStatus)(pl.lifecycleStatus)
      });

    case types.UPDATE_AUTO_RENEW_ERROR:
      return (0, _extends3.default)({}, state, {
        errorMessage: constants.UPDATE_AUTO_RENEW,
        loading: false,
        successMessage: false
      });

    // UPDATE PAYMENT PREF
    case types.UPDATE_PAYMENT_PREF_REQUEST:
      return (0, _extends3.default)({}, state, { loading: true });

    case types.UPDATE_PAYMENT_PREF_SUCCESS:
      return (0, _extends3.default)({}, state, {
        autoRenew: pl.autoRenew,
        cardInfo: pl.cardInfo,
        cardStatus: pl.cardStatus,
        errorMessage: false,
        loading: false,
        renewalDate: (0, _helpers.formatDate)(pl.expiryDate),
        success: true,
        trialStatus: (0, _helpers.checkLifecycleStatus)(pl.lifecycleStatus)
      });

    case types.UPDATE_PAYMENT_PREF_ERROR:
      return (0, _extends3.default)({}, state, {
        errorMessage: constants.UPDATE_PAYMENT_PREF,
        loading: false,
        successMessage: false
      });

    default:
      return state;
  }
};

exports.default = subscriptionStatus;