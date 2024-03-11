import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { bridgelistController } from "./controllers/bridgelist-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addbridgelist", config: dashboardController.addBridgelist },
  { method: "GET", path: "/dashboard/deletebridgelist/{id}", config: dashboardController.deleteBridgelist },

  { method: "GET", path: "/bridgelist/{id}", config: bridgelistController.index },
  { method: "POST", path: "/bridgelist/{id}/addbridge", config: bridgelistController.addBridge },
  { method: "GET", path: "/bridgelist/{id}/deletebridge/{bridgeid}", config: bridgelistController.deleteBridge },

]; 