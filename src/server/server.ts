import express from 'express';
import path from 'path';
import weatherRoutes from '../client/routes/weather-routes';
import aboutRoute from '../client/routes/about-route';
import homepageRoute from '../client/routes/homepage-route';
import alertsRoute from '../client/routes/alerts-route';
import signInRoute from '../client/routes/sign-in-route';
import signUpRoute from '../client/routes/sign-up-route';
import coordinatesRoute from '../client/routes/coordinates-route';
import { addUser } from '../client/routes/add-user-route';
import { signIn } from '../client/routes/sign-in-user-route';
import { signOut } from '../client/routes/sign-out-user-route';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const publicPath = path.join(__dirname, '..', 'client', 'public');
app.use(express.static(publicPath));

app.use('/components', express.static(path.join(__dirname, '..', 'client', 'components')));
app.use('/scripts', express.static(path.join(__dirname, '..', 'client', 'scripts'), {
    setHeaders: (res, path) => {
        res.setHeader('Content-Type', 'application/javascript');
    }
}));
app.use('/style', express.static(path.join(__dirname, '..', 'client', 'styles')));
app.use('/img', express.static(path.join(__dirname, '..', 'client', 'public', 'img')));
app.use('/public', express.static(path.join(__dirname, '..', 'client', 'public')));
app.use('/controller', express.static(path.join(__dirname, '..', 'client', 'controller')));
app.use('/config', express.static(path.join(__dirname, '..', 'client', 'config')));

app.post('/add-user', addUser);
app.post('/sign-in', signIn);
app.get('/sign-out', signOut);

app.use('/', homepageRoute);
app.use('/weather', weatherRoutes);
app.use('/about', aboutRoute);
app.use('/alerts', alertsRoute);
app.use('/sign-in', signInRoute);
app.use('/sign-up', signUpRoute);
app.use('/coordinates', coordinatesRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});