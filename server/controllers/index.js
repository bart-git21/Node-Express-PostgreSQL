import {userRoutes} from "./user-routes.js";
import {authRoutes} from "./auth-routes.js";

const controller = {
    ...authRoutes,
    ...userRoutes
}

export { controller };
