import * as express from 'express';
import {Request, Response} from 'express';

export default abstract class RESTRoute {
	protected otherRoutes: [{ route: string, func: (req: Request, res: Response) => void }];

	constructor() {
		// @ts-ignore
		this.otherRoutes = [];
	}

	public GET(req: Request, res: Response): void {
		return;
	}

	public POST(req: Request, res: Response): void {
		return;
	}

	public PUT(req: Request, res: Response): void {
		return;
	}

	public DELETE(req: Request, res: Response): void {
		return;
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