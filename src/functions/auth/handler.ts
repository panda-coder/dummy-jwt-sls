import { middyfy } from '@libs/lambda';

import jwt from 'jsonwebtoken';


const validate  = async (event, _context, callback) => {
  const Bearer = event.authorizationToken?.replace(/Bearer /g, '');
  
  try {
    const token = await jwt.verify(Bearer, 'PASSWORD#123');

    callback(null, generatePolicy({cpf: token.cpf}, 'Allow', event.methodArn));
  }catch(err) {
    callback(null, generatePolicy(null, 'Deny', event.methodArn));
  }
  
  
}

export const main = middyfy(validate);

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