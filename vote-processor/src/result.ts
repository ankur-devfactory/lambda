import {APIGatewayProxyEventV2,APIGatewayProxyHandlerV2,APIGatewayProxyResultV2} from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";



const dynamo = new DocumentClient();
const voting_table = process.env.VOTING_TABLE;

export const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    
    let result = await getVoteCount();
  
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  };
  const weekNumber = (): number => {
    // Get Week Number
    // Code referenced from https://www.delftstack.com/howto/javascript/javascript-get-week-number/
    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(),0,1);
    var numberOfDays = Math.floor(((currentdate as any)  - (oneJan as any)) / (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
    console.log(weekNumber);
    return weekNumber;
  };

const yearNumber = (): number => {
    console.log(new Date().getFullYear());
    return new Date().getFullYear();
  };

const getVoteCount = (): any => {
    let voteKey = 'Votecount' + '#' + yearNumber().toString() + '#' + weekNumber().toString();
    console.log(voteKey);
    var result =  dynamo.scan({
                        TableName: voting_table,
                        FilterExpression: 'rec_type = :ty',
                        ExpressionAttributeValues: {
                            ':ty': voteKey
                        }
                    })
                    .promise();
    return result;
}