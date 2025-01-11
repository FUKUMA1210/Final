import { Route } from "../abstract/Route";
import { PageController } from "../controller/pageController";
import { Request, Response } from "express";

export class PageRoute extends Route {
  protected url: string = "/"; 
  protected Controller = new PageController(); 

  constructor() {
    super(); 
    this.setRoutes(); 
  }

  protected setRoutes(): void {

    this.router.get(this.url, (req: Request, res: Response) => {
      this.Controller.sendPage(req, res); 
    });
  }
}
