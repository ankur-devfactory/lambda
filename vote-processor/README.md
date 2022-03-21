# Queue Processor
This function takes input in following format:

```
{
  "productID": "xyzzy420",
  "textFields": {
    "title": "How to use Oracle Cloud",
    "description": "The definitive guide to using the world's leading cloud platform that isn't AWS, Azure, GCP, or several others. This is Apple Cloud."
  }
}
```

and searches for banned words:

```
"apple", "banana", "orange", "strawberry", "cherry"
```

and if found sends an SNS notification in following format:

```
{
  "productID": "xyzzy420",
  "flaggedWords": ["apple"]
}

```

## Getting Started

1- Install Dependencies
 ```
 npm install
 ```

2- Replace the following tags:
  - EMAIL_ADDRESS (e.g. first.last@domain.com)
  - TICKET_NUMBER (e.g. TPM-000)

3- Run the command below which will compile, package, and deploy your stack.

  ```
  npm run webpack && sam package --s3-bucket tpm-learning-sam-cli-bucket && sam deploy --tags "purpose=\"TPM Learning\" owner=EMAIL_ADDRESS" --stack-name "TICKET_NUMBER"
  ```

## Extra commands
1. Compile: `npm run webpack`
2. Package: `sam package --s3-bucket <bucket-name>`
3. Deploy: `sam deploy`

**Note** If you want to change the default configurations (e.g. AWS region, subscription email), you can run `sam deploy --guided`, which will ask some questions and then update the `samconfig.toml` file.

## Test the application run the following in the AWS CLI:

###### Case With Banned Words:

```
aws sqs send-message \
--queue-url "https://sqs.us-east-1.amazonaws.com/162174280605/Ankur-SQS-Queue-new" \
--message-body '{"productID": "xyzzy420","textFields": {"title": "How to use Cloud apple","description": "apple orange Test apple."}}'
```

###### Case Without Banned Words:

```
aws sqs send-message \
--queue-url "https://sqs.us-east-1.amazonaws.com/162174280605/Ankur-SQS-Queue-new" \
--message-body '{"productID": "xyzzy420","textFields": {"title": "abcd defgh"}}'
```
