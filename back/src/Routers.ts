import {Route} from "./abstract/Route";
import { PageRoute } from "./routers/pageRoute";
import { UserRoute } from "./routers/CommentRoute";

export const router: Array<Route> = [
    new PageRoute(),new UserRoute()
];

