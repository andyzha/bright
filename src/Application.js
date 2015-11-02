import React, { PropTypes, Component } from "react";
import { provideContext, connectToStores } from "fluxible-addons-react";
import { handleHistory } from "fluxible-router";

import Page from "./components/base/Page";
// import Immutable from "immutable";

import NotFoundPage from "./components/NotFoundPage";
import ErrorPage from "./components/ErrorPage";
import LoadingPage from "./components/LoadingPage";

import HtmlHeadStore from './stores/HtmlHeadStore';
// import UserStore from './stores/UserStore';
//import trackPageView from "./utils/trackPageView";

var debug = require("debug")("brightApplication");

// if (process.env.BROWSER) {
//   require("./style/Application.scss");
// }

// Wrap Application with the fluxible context.
// PS. new to this syntax? Those are called "decorators", see
// https://babeljs.io/docs/usage/experimental/
@provideContext

// Wrap with fluxible-router's history handler (required for routing)
// This also passes `currentRoute` as prop to the component
@handleHistory

// Listen to HtmlHeadStore and pass the document title to the component
@connectToStores([HtmlHeadStore], (context) =>
  ({
    documentTitle: context.getStore(HtmlHeadStore).getTitle() })
)

class Application extends Component {

  static propTypes = {

    // props coming from fluxible-router's handleHistory
    isNavigateComplete: PropTypes.bool,
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    }),

    // prop coming from HtmlHeadStore
    documentTitle: PropTypes.string,
    loggedInUser: PropTypes.object

  }

  componentDidUpdate(prevProps) {
    const { documentTitle, currentRoute } = this.props;

    if (prevProps.documentTitle !== documentTitle) {
      document.title = documentTitle;
    }

    // if (!Immutable.is(prevProps.currentRoute, currentRoute)) {
    //   trackPageView(currentRoute.get("url"));
    // }
  }

  render() {
    debug('Application render');
    const { currentRoute, currentNavigateError, isNavigateComplete }
      = this.props;

    let Handler = currentRoute && currentRoute.get("handler");

    let content;

    if (currentNavigateError && currentNavigateError.statusCode === 404) {
      // This "not found" error comes from a page init actions (InitActions.js)
      // e.g. when a 500px API responds 404
      content = <NotFoundPage />;
    }
    else if (currentNavigateError) {
      // Generic error, usually always with statusCode 500
      content = <ErrorPage err={currentNavigateError} />;
    }
    else if (!Handler) {
      // No handler: this is another case where a route is not found (e.g.
      // is not defined in the routes.js config)
      content = <NotFoundPage />;
    }
    else if (!isNavigateComplete) {
      // Show a loading page while waiting the route's action to finish
      content = <LoadingPage />;
    }
    else {
      // Here you go with the actual page content
      const params = currentRoute.get("params").toJS();
      content = <Handler {...params} />;
    }
    return (
      <Page footer={isNavigateComplete} >
        { content }
      </Page>
    );
  }

}

export default Application;
