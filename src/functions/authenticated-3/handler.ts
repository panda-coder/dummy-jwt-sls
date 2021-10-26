import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { success } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { principalId: user } = event.requestContext.authorizer
  return success({
    message: `Hello ${user.cpf}`
  });
}

export const main = middyfy(hello);
