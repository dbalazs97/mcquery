import * as express from 'express';
import {NextFunction, Request, Response} from 'express';

export default abstract class RESTRoute {
	protected otherRoutes: [{ route: string, func: (req: Request, res: Response, next: NextFunction) => void }];

	constructor() {
		// @ts-ignore
		this.otherRoutes = [];
	}

	public GET(req: Request, res: Response, next: NextFunction): void {
		next();
	}

	public POST(req: Request, res: Response, next: NextFunction): void {
		next();
	}

	public PUT(req: Request, res: Response, next: NextFunction): void {
		next();
	}

	public DELETE(req: Request, res: Response, next: NextFunction): void {
		next();
	}

	public build(route: string, app: express.Application) {
		app.route(route)
			.get(this.GET)
			.post(this.POST)
			.put(this.PUT)
			.delete(this.DELETE)
		;

		this.otherRoutes.forEach(value => app.get(value.route, value.func));
	}
}