import {Request, Response} from 'express';
import {Item} from '../model/Item';
import RESTRoute from './RESTRoute';

export default class ItemRoutes extends RESTRoute {

	constructor() {
		super();
		this.otherRoutes.push({
			func: (req, res) => {
				res.status(200).send(Item.getItemByID(parseInt(req.params.itemid, 10)).type);
			},
			route: '/item/:itemid',
		});
	}

	public GET(req: Request, res: Response): void {
		res.status(200).send(Item.list.map(i => i.type));
	}
}