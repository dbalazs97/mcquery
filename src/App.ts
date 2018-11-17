import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
// @ts-ignore
import pngCrop from 'png-crop';
import {Stream} from 'stream';
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

		console.log();
		this.app.get('/sprite/:tx/:ty', (req, res) => {
			if (
				typeof req.params.tx === 'undefined' ||
				typeof req.params.ty === 'undefined' ||
				req.params.tx > 31 ||
				req.params.ty > 77 ||
				req.params.tx < 0 ||
				req.params.ty < 0
			) {
				return res.send({error: true});
			}

			const cropOptions = {
				height: 32,
				left: req.params.tx * 32,
				top: req.params.ty * 32,
				width: 32,
			};

			pngCrop.cropToStream(fs.readFileSync(path.join(__dirname, '../static/sprite.png')), cropOptions, (e: any, s: Stream) => {
				if (e) {
					return res.send({error: true});
				}
				s.pipe(res);
			});
		});
	}

	public listen(callback?: () => void): void {
		this.app.listen(this.port, callback);
	}

	private config(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended: false}));
	}
}