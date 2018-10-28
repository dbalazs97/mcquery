import {NextFunction, Request, Response} from 'express';
import {Block} from '../model/Block';
import RESTRoute from './RESTRoute';

export default class BlockRoutes extends RESTRoute {

	constructor() {
		super();
		this.otherRoutes.push({
			func: (req, res, next) => {
				res.send(JSON.stringify(Block.getBlockByID(parseInt(req.params.blockid, 10))));
				return next();
			},
			route: '/block/:blockid',
		});
	}

	public GET(req: Request, res: Response, next: NextFunction): void {
		res.send(JSON.stringify(Block.enumBlocks()));
		next();
	}
}