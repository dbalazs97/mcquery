import * as bodyParser from 'body-parser';
import * as express from 'express';
import ItemRoutes from './routes/ItemRoutes';

export default class App {

	public app: express.Application;
	private readonly port: number;

	constructor(port: number = 3000) {
		this.app = express.default();
		this.port = port;
		this.config();
		new ItemRoutes().build('/items', this.app);
	}

	public listen(callback?: () => void): void {
		this.app.listen(this.port, callback);
	}

	private config(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended: false}));
	}
}