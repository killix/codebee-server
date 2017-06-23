import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';

import Router from './routes/Router';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static('../web/dist'));
// app.use('/static', express.static('public'));

// Routes
app.use('/', Router);

// catch 404 and forward to error handler
app.use((req: any, res: any, next: any) => {
  next();
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: any, res: any, next: any) => {
    res.status(500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500);
  res.json({
    message: err.message,
    error: {}
  });
});

export default app;
