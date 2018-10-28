import {Request, Response} from 'express';
import {Block} from '../model/Block';
import RESTRoute from './RESTRoute';

export default class BlockRoutes extends RESTRoute {

	constructor() {
		super();
		this.otherRoutes.push({
			func: (req, res) => {
				res.status(200).send(Block.getBlockByID(parseInt(req.params.blockid, 10)));
			},
			route: '/block/:blockid',
		});
	}

	public GET(req: Request, res: Response): void {
		res.status(200).send(Block.list);
	}
}