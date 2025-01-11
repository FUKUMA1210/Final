import { Route } from "../abstract/Route"
import { UserController } from "../controller/UserController";

export class UserRoute extends Route {

  protected url: string;
  protected Controller = new UserController();

  constructor() {
      super()
      this.url = '/api/v1/user/'
      this.setRoutes()
  }

  protected setRoutes(): void {

      this.router.get(`${this.url}getAllUsers`, (req, res) => {
          this.Controller.getAllUsers(req, res);
      })

      this.router.post(`${this.url}addUser`, (req, res) => {
          this.Controller.addUser(req, res);
      })
  }
}