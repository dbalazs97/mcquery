import {NextFunction, Request, Response} from 'express';
import {Item} from '../model/Item';
import RESTRoute from './RESTRoute';

export default class ItemRoutes extends RESTRoute {

	constructor() {
		super();
		this.otherRoutes.push({
			func: (req, res, next) => {
				res.send(JSON.stringify(Item.getItemByID(parseInt(req.params.itemid, 10))));
				return next();
			},
			route: '/item/:itemid',
		});
	}

	public GET(req: Request, res: Response, next: NextFunction): void {
		res.send(JSON.stringify(Item.enumItems()));
		next();
	}
}