import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { success, denied } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import jwt from 'jsonwebtoken';

import schema from './schema';



const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { body } = event

  if ( body.user !== 'test' && body.user !== '123'){
    return denied({message: 'User not found'});
  }

  const token = jwt.sign({user: 'test'}, 'PASSWORD#123');


  return success(token);
}

export const main = middyfy(login);
