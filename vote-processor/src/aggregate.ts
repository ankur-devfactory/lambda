import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
const dynamo = new DocumentClient();
const voting_table = process.env.VOTING_TABLE ;

export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
    await Promise.all(event.Records.map(async record => {
      if (record.dynamodb?.NewImage?.type?.S == 'Vote') {
        await addVote(record.dynamodb.NewImage.programmer.S, record.dynamodb.NewImage.user.S)
      }
    }))
}

export const addVote = async (contestant: string, user: string) => {
    await dynamo.update({
        TableName: voting_table,
        Key: { user: user,type: 'VoteCount' },
        UpdateExpression: 'add noOfvotes :one',
        ExpressionAttributeValues: {
          ':one': 1
        }
      }).promise();
}