import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import { RouteStore } from "fluxible-router";

import routes from "./routes";

import Application from "./Application";

import ProductStore from "./stores/ProductStore";
import HtmlHeadStore from "./stores/HtmlHeadStore";
import CartStore from "./stores/CartStore";
import UserStore from "./stores/UserStore";
//import IntlStore from "./stores/IntlStore";

// Create the fluxible app using Application as root component
const app = new Fluxible({ component: Application });

// Make fetchr services respond to /api endpoint
app.plug(fetchrPlugin({ xhrPath: "/api" }));

// Register a fluxible RouteStore
const AppRouteStore = RouteStore.withStaticRoutes(routes);
app.registerStore(AppRouteStore);

// Register app-specific stores
app.registerStore(ProductStore);
app.registerStore(HtmlHeadStore);
app.registerStore(CartStore);
app.registerStore(UserStore);
// app.registerStore(IntlStore);

export default app;
