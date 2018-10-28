import {NextFunction, Request, Response} from 'express';
import {Recipe} from '../model/Recipe';
import RESTRoute from './RESTRoute';

export default class RecipeRoutes extends RESTRoute {

	constructor() {
		super();
		this.otherRoutes.push({
			func: (req, res, next) => {
				res.send(JSON.stringify(Recipe.getRecipeByID(parseInt(req.params.recipeid, 10))));
				return next();
			},
			route: '/recipe/:recipeid',
		});
	}

	public GET(req: Request, res: Response, next: NextFunction): void {
		res.send(JSON.stringify(Recipe.enumRecipes()));
		next();
	}
}