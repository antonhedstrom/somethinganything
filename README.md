

# _Something_ relates to _Anything_

A project I am personally using to store things more easily in a dynamic way that makes it searchable. The models aim to be very plain and straight forward and should not be stopping me from storing data. Basically it consist of 2 types: Something and Anything. Something is the entry point for posts. It can then be related to a number of Anythings. Beside that I also have Tags so I can tag my Somethings. In future, a Tag might be an Anything but need to start somewhere.

I am using create-react-app and in parallell with that, an Express server. In ordet to have them work together I followed this blog post:
https://levelup.gitconnected.com/create-a-react-app-with-an-express-backend-24740b0a6f5e

# Tech stack

A simple list of things being used in this project.

* [PostgreSQL](https://www.postgresql.org/)
* [Node](https://nodejs.org) with [Express](https://expressjs.com)
* [React](https://reactjs.org) with [Create React App](https://create-react-app.dev)
* [turtle-ui](https://www.npmjs.com/package/turtle-ui) (with modifications)
* [skeleton](http://getskeleton.com/) (with modifications)

# Deployment

A Postgres DB is required and the environment variable `DB_CONNECTIONSTRING` need to be set. The database specified need to exists (dah).

With that requirement, to build and start your server in production mode:

```
npm start
```

# Install Depencies

All dependecies (including the separate ones in `./client/`) are installed using:

```
npm install
```

# Development

To start your application locally, you need a DB (add to .env) and start Create React App.

## Database

You need a DB to connect to. Surprise!

If you have docker installed, you can start one (deamonized) by:

```
docker run --rm --name postgres-local -e POSTGRES_PASSWORD=docker -d -p 5678:5432 -v $HOME/.docker-data/postgres:/var/lib/postgresql/data postgres
```

Then edit/add the .env file and set the DB Connectionstring:

```
DB_CONNECTIONSTRING=postgres://postgres:docker@localhost:5678/somethinganything
```

### Create migration

```
npx sequelize-cli migration:generate --name my-name
```

## Start app

The client is being built using [Create React App](https://create-react-app.dev). To start server and watching files+hot reload of client side code:

```
npm run dev # Start both server and Create React app. Should be enough in most cases.

# Optionally start separetly:
npm run server # Starts only server
npm run client # Starts only Create React App
```
