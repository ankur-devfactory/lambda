# Queue Processor
This function takes input in following format:

```
{
  "productID": "xyzzy420",
  "textFields": {
    "title": "How to use Oracle Cloud",
    "description": "The definitive guide to using the world's leading cloud platform that isn't AWS, Azure, GCP, or several others. This is Oracle Cloud."
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
  "flaggedWords": ["oracle"]
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

**Boilerplate note** If you want to change the default configurations (e.g. AWS region), you can run `sam deploy --guided`, which will ask some questions and then update the `samconfig.toml` file.


## Usage

TODO Add usage instructions for your own solution.
