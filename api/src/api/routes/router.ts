import * as Router from 'koa-router';
import { Api } from '../';

export class ApiRouter extends Router<Api.StateT, Api.CustomT> {}
