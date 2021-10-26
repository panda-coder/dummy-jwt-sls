import { middyfy } from '@libs/lambda';

import jwt from 'jsonwebtoken';


const hello  = async (event, _context, callback) => {
  const token = event.authorizationToken.replace(/Bearer /g, '');
  
  jwt.verify(token, 'PASSWORD#123', (err, _verified) => {
    if (err) {
      console.error('JWT Error', err, err.stack);
      callback(null, generatePolicy('user-id', 'Deny', event.methodArn));
    } else {
      callback(null, generatePolicy('user-id', 'Allow', event.methodArn));
    }
  });
}

export const main = middyfy(hello);

// Help function to generate an IAM policy
const generatePolicy = function(principalId, effect, resource) {
  var authResponse: any = {};
  
  authResponse.principalId = principalId;
  if (effect && resource) {
      const policyDocument: any = {};
      policyDocument.Version = '2012-10-17'; 
      policyDocument.Statement = [];
      const statementOne: any = {};
      statementOne.Action = 'execute-api:Invoke'; 
      statementOne.Effect = effect;
      statementOne.Resource = resource;
      policyDocument.Statement[0] = statementOne;
      authResponse.policyDocument = policyDocument;
  }
  
  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = {
      "stringKey": "stringval",
      "numberKey": 123,
      "booleanKey": true
  };
  return authResponse;
}