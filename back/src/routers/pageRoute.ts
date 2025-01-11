<<<<<<< HEAD
import { Route } from "../abstract/Route"
import { PageController } from '../controller/pageController'

export class PageRoute extends Route{
    
    protected url: string;
    protected Contorller = new PageController();

    constructor(){
        super()
        this.url = '/'
        this.setRoutes()
    }

    protected setRoutes(): void {
        this.router.get(`${this.url}`,(req, res)=>{
            this.Contorller.sendPage(req, res);
        })
    }

}
=======
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
>>>>>>> backend
