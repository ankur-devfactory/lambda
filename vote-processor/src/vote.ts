
   
import {APIGatewayProxyEventV2,APIGatewayProxyHandlerV2,APIGatewayProxyResultV2} from "aws-lambda";
import { DynamoDB } from "aws-sdk";

type Vote = {
  email: string;
  programmer: string;
};

const dynamoDB = new DynamoDB();
const voting_table = process.env.VOTING_TABLE ;

const weekNumber = (): number => {
    // Get Week Number
    // Code referenced from https://www.delftstack.com/howto/javascript/javascript-get-week-number/
    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(),0,1);
    var numberOfDays = Math.floor(((currentdate as any)  - (oneJan as any)) / (24 * 60 * 60 * 1000));
    return Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
  };

const checkProgrammer = (programmer: string): boolean => {
    var result = weekNumber();
    
    // For odd and even week let's have a different set of programmers
    const programmers = [
      ["even_p1", "even_p2", "even_p3", "even_p4"], // Even Week
      ["odd_p1", "odd_p2", "odd_p3", "odd_p4"] // Odd Week
    ];
    // check if the programmer is in the weeks programmers list
    return programmers[result % 2].includes(programmer);
  };

const checkVotingDay = (timeStamp: Date): boolean => {
    // Voting can happen on weekdays only
    const day = timeStamp.getUTCDay();
    return day >= 1 && day <= 5;
  };
  
export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
    const input: Vote = JSON.parse(event.body || "{}");
  console.log("input:", input);

  let validity = false;
  // check if a programmer is due for voting and the time within stipulated voting time.
  if (checkProgrammer(input.programmer) && checkVotingDay(new Date())) {
    validity = true;
  }
  if (validity) {
    // Insert into db
    await insertVote(input.email, input.programmer);
  } else{
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: "Vote not submitted",
      };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: "Vote Submitted",
  };
};



const insertVote = async (email: string, programmer: string): Promise<any> => {
  const week = weekNumber();
  const insertVote = `INSERT INTO "${voting_table}" value 
      {'user' : '${email}##${week}',
      'programmer': '${programmer}',
      'time':'${new Date()}'
    }`;
  await dynamoDB
    .executeStatement({
      Statement: insertVote,
    })
    .promise()
    .catch((reason: any) => {
      console.log(reason);
    });
};