# sms_voice_banking_backend
Nodejs backend in typescript for the sms and ussd solution for the banking app.

THis is a project was build in a developement and simluation environment on the africas-talking api.

## The idea.
To put up a simple banking solution for mobile users who do not have have access to a smart mobile phone (andriod / ios).

## Usecase.
1. The user create's an account by entering a ussd code. If first time the system will prompt you to register. else will show the following.
  - Account info
  - Jont account info
  - send funds
  - recieve funds.
     
### Account info
This menu information just provides the account information. The firstname, lastname, phone number and the joint-accounts you are on.

### Joint accounts.
This shows you information on the joint accounts you are already integerated with. 

#### More on joint accounts.
Joint accounts is a unique mobile banking feature added to this service where more than one user can manage and share funds.
The idea is to be able to share funds between two or more users. The account holder can add multiple phone nubmers who are already registered.
But the account holder can also limit the amount of funds usage perday for all the added users.

### Send funds.
Users (both account holders and joint users) can send and recieve funds.   
