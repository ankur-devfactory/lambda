# Vote Processor
This function creates two external facing function.

1) Function to register vote.

# Input:

```
{
 "email": "priyanka.agarwal0012@devfactory.com",
 "programmer": "odd_p4"
}
```

# Request Parameters:
a) Email: It is the email of the person casting vote
b) Programmer: It is the programmer receiving the vote.

# Validation Condition:
a) One person (one unique email id) can cast only 1 vote in a given week.
b) The voting can happen on weekdays only.
c) There are two list of participants, and each is valid for one week & then it rolls over to other list. Below is the list:

```
      ["even_p1", "even_p2", "even_p3", "even_p4"] // Even Week
      ["odd_p1", "odd_p2", "odd_p3", "odd_p4"] // Odd Week
```

# Output: 
It stores this vote in DynamoDB Table, but returns nothing.

2) Function to get the count of casted votes for current week.

# Input:

```
{
"accessKey": "tpm-2449"
}

```

# Request Parameters:
a) accessKey: It is the key provided to access the API, it should be passed as “tpm-2449” only.

# Output: 
It retrives the vote count and returns the information in below format.

```
{
   "Items": [
       {
           "noOfvotes": 2,
           "programmer": "odd_p1",
           "uniqueWeek": "2022#13"
       },
       {
           "noOfvotes": 1,
           "programmer": "odd_p2",
           "uniqueWeek": "2022#13"
       },
       {
           "noOfvotes": 5,
           "programmer": "odd_p3",
           "uniqueWeek": "2022#13"
       },
       {
           "noOfvotes": 2,
           "programmer": "odd_p4",
           "uniqueWeek": "2022#13"
       }
   ],
   "Count": 4,
   "ScannedCount": 4
}
```

## Getting Started with Installation

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
