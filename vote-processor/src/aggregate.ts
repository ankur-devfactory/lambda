import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
const dynamo = new DocumentClient();
const voting_table = process.env.VOTING_TABLE ;

export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
    await Promise.all(event.Records.map(async record => {
      if (record.dynamodb?.NewImage?.rec_type?.S == 'Vote') {
        console.log(JSON.stringify(record.dynamodb.NewImage));
        await addVote(record.dynamodb.NewImage.programmer.S, record.dynamodb.NewImage.year.N, record.dynamodb.NewImage.weekNumber.N)
      }
    }))
}

export const addVote = async (programmer: string, year: string, weekNumber: string) => {
    let type = 'Votecount' + '#' + year + '#' + weekNumber;
    await dynamo.update({
        TableName: voting_table,
        Key: { user: programmer,rec_type: type },
        UpdateExpression: 'add noOfvotes :one',
        ExpressionAttributeValues: {
          ':one': 1
        }
      }).promise();
}