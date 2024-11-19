// src/index.ts
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { getLogger } from './core/logging'; // import the getLogger function as a named (<=> default) import
import installRest from './rest'; // default: index

const app = new Koa(); // initialising the Koa-object, i.e. the webserver

const port = 9000;  // easier to change using this const, perhaps later in config?

app.use(bodyParser());

installRest(app);
//hier zou je ook interfaces kunnen voorzien voor andere clients
//zoals graphql, GraphQL is an API query language and runtime for interacting with data,
// designed to provide more flexibility and efficiency than REST (Representational State Transfer).
//It was developed by Facebook and open-sourced in 2015.
// trpc jrpc, ...

app.listen(port, () => {
  //getLogger().info(`🚀 Server listening on http://127.0.0.1:${port}`);
  //getLogger().log(getLogger().level,`🚀 Server listening on http://127.0.0.1:${port}`, {error: new Error('test')});
  getLogger().log(getLogger().level,`🚀 Server listening on http://127.0.0.1:${port}`, {foo: 'bar'});
});
