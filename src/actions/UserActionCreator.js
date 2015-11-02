import ActionNames from "../constants/ActionNames";
var debug = require("debug")("brightActionUser");

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const UserActionCreator = {

  createUser(context, { user }, done) {

    context.service.create("user", { user }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        debug("user return data: " + data);
        context.dispatch(ActionNames.LOAD_User_SUCCESS, data);
        done();
      }
    );
  },

  handleServiceRenderUser(context, { user }, done) {
    let loggedInUser = {};
    if (user != null) {
      loggedInUser.name = user.email;
      loggedInUser.id = user.id;
    }
    context.dispatch(ActionNames.HandleServiceRenderUser, loggedInUser);
    done();
  },

  login(context, { user }, done) {

    context.service.read("user", { user }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        debug("user return data: " + data);
        context.dispatch(ActionNames.LOAD_User_SUCCESS, data);
        done();
      }
    );
  }

};

export default UserActionCreator;
