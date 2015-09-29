import keyMirror from "react/lib/keyMirror";

const ActionNames = keyMirror({

  LOAD_Product_SUCCESS: null,
  LOAD_User_SUCCESS: null,
  LOAD_Cart_SUCCESS: null,
  //LOAD_INTL_SERVER: null,

  // fluxible-router actions
  NAVIGATE_START: null,
  NAVIGATE_SUCCESS: null,
  NAVIGATE_FAILURE: null

});


export default ActionNames;
