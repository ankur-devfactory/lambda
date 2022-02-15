# Lambda Typescript & CloudFormation Boilerplate

TODO Update this README file with your own solution's title and details.

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
