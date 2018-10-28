import {Request, Response} from 'express';
import {Recipe} from '../model/Recipe';
import RESTRoute from './RESTRoute';

export default class RecipeRoutes extends RESTRoute {

	constructor() {
		super();
		this.otherRoutes.push({
			func: (req, res) => {
				res.status(200).send(Recipe.getRecipeByID(parseInt(req.params.recipeid, 10)));
			},
			route: '/recipe/:recipeid',
		});
		this.otherRoutes.push({
			func: (req, res) => {
				res.status(200).send(Recipe.getRecipeByResult(parseInt(req.params.itemid, 10)));
			},
			route: '/recipe/result/:itemid',
		});
	}

	public GET(req: Request, res: Response): void {
		res.status(200).send(Recipe.list);
	}
}