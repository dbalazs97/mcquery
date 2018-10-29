import App from './App';

const port: number = (process.env.PORT !== undefined) ? parseInt(process.env.PORT, 10) : 3000;
const app: App = new App(port);
app.listen(() => console.log(`MCQuery server listens on port ${port}.`));