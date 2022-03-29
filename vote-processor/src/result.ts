import {APIGatewayProxyEventV2,APIGatewayProxyHandlerV2,APIGatewayProxyResultV2} from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";



const dynamo = new DocumentClient();
const voting_table = process.env.VOTING_AGGREGATE_TABLE;

type Request = {
  accessKey: string;
};

export const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    
    const input: Request = JSON.parse(event.body || "{}");
    if (input.accessKey != 'tpm-2449'){
      return { 
        statusCode: 403,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify("Invalid Access Key! Access Denied."),
      }
    }
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
  let voteKey = yearNumber().toString() + '#' + weekNumber().toString();
  var params = {
    TableName : voting_table,
    KeyConditionExpression: "uniqueWeek = :uw",
    ExpressionAttributeValues: {
        ":uw": voteKey
    }
  };
  console.log(voteKey);
  var result =  dynamo.query(params)
                    .promise();
  return result;
}