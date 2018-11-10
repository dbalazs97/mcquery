import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import {Block} from './model/Block';
import {Item} from './model/Item';
import {Recipe} from './model/Recipe';
import BlockRoutes from './routes/BlockRoutes';
import ItemRoutes from './routes/ItemRoutes';
import RecipeRoutes from './routes/RecipeRoutes';

export default class App {

	public app: express.Application;
	private readonly port: number;

	constructor(port: number = 3000) {
		Item.enumItems();
		Block.enumBlocks();
		Recipe.enumRecipes();

		this.app = express.default();
		this.port = port;
		this.config();

		new ItemRoutes().build('/items', this.app);
		new BlockRoutes().build('/blocks', this.app);
		new RecipeRoutes().build('/recipes', this.app);

		console.log(path.join(__dirname + '../static'));
		this.app.use(express.static(path.join(__dirname, '../static')));
	}

	public listen(callback?: () => void): void {
		this.app.listen(this.port, callback);
	}

	private config(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended: false}));
	}
}