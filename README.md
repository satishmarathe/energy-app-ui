#1
Create a React app .

#1.1
what will we name it as ?
we will call it 'energy-app-ui'

#1.2
how will we create the react app ?
we will create the react app using the command :
npx create-react-app energy-app-ui

#2
Now first thing we will do is commit this code in github :

#2.1
Create a repo in github ( give repo whatever name you wish to ) 

#2.2
Once the repo is created in github , get the URL of Github repo from Github 
( this is the same step where we get the URL of the repo we want to clone ) 

#2.3
Then we need to add this GITHUB URL to our react app created locally.
This step will ensure that our local app is connected to remote github repo.
git remote add origin https://github.com/satishmarathe/energy-app-ui.git

#2.4
Verify that the repo is pointing to Github repo by running the command:
git remote -v

This prints the following :
origin  https://github.com/satishmarathe/energy-app-ui.git (fetch)
origin  https://github.com/satishmarathe/energy-app-ui.git (push)

#2.5
Now push the repo from local to Github with the command:
git push origin master

Thats it ! - your project is committed to github and is on the cloud !

#3
Define the contract between React UI and server side using Spring Boot.
This contract will be defined using Swagger spec.

#3.1
We will use the swagger template available locally.
( we have swagger editor locally ) 
Open swagger editor in browser which opens by default 'Swagger Petstore' template YAML file.
This template has all kinds of end points with GET , PUT POST DELETE etc
The editor has the option to save this template - so save a copy of this template in your project.

#3.2
Next step is to open this saved off file in Swagger editor.
In Swagger Editor >> File >> Import URL >> Import the spec
Then directly make changes in the editor and save off the file which becomes our spec.

#3.3
Having trouble in defining the response for a GET 
I want to return a JSON array.
We did find an existing example in the swagger provided spec.
BUT for future to remember is - that its not a big deal.
To return an array all we have to do is wrap javascript objects in []
Ex:
[
  {
    "id": 1,
    "vendor": "string",
    "fromDate": "string",
    "toDate": "string",
    "days": "string",
    "receivedDate": "string",
    "dueDate": "string",
    "paidDate": "string",
    "billAmount": "string",
    "comments": "string"
  },
  {
    "id": 2,
    "vendor": "string",
    "fromDate": "string",
    "toDate": "string",
    "days": "string",
    "receivedDate": "string",
    "dueDate": "string",
    "paidDate": "string",
    "billAmount": "string",
    "comments": "string"
  }
]

#3.4
Now the next challenge we are facing is defining the appropriate data types in swagger.
CHALLENGE / TROUBLE : what should the data types be used for 'Date' , 'Days' , 'Amount' , 'Comments'
NOTE : we realised later that yes this is a design challenge but it will be more in server side code 
as well as client side java script code.
The present challenge is in swagger spec.

#3.5
CHALLENGE / TROUBLE : defining appropriate data types in Swagger

#4
Now that we have defined the swagger spec , we have defined the response structure.
So we now need to develop our front end using this response structure.

#4.1
We do not want to wait for the backend api to be developed and running to develop / test our front end.
CHALLENGE / TROUBLE : How do we achieve this ?

We have identified that we will need 'Json Server' for above requirement.
Now we need to install this in our project.

CHALLENGE / TROUBLE : how do we install 'Json Server' ?
'Create react app' that we used to create our react app uses node and npm.
Within the project we created is a file called : 'package.json'
This file is like our maven pom file which will contain dependencies.

We can define within this file 'dev dependencies' and 'production dependencies'

We need the JSON server only in development.
So here is the command we will use :
npm install json-server --save-dev

This link was 'slightly' useful :
https://dev.to/mariorodeghiero/json-server-with-reactjs-3chd

So at this stage we have installed 'Json server' as a dev dependency.

#4.2
We installed some additional dev dependencies :
npm install chalk --save-dev
npm install cross-env --save-dev

CHALLENGE / TROUBLE : while trying to commit code we now see that a files called 'package-lock.json' has changed.
We are not sure if this file needs to be checked in or not .
Any changes we make in 'package.json' get registered in 'package-lock.json'
It seems 'package-lock.json' is used to lock dependencies to a specific version number.
This becomes important because if in 'package.json' we have a dependency defined like this:
"some_dependency": "^2.12.0"
So any later version of that dependency when published will be pulled.
And then you might have problems in your code.
So you would like to 'LOCK' down your dependency versions - which is done when you have a 'package-lock.json' file.
So this file should be present and should be in version control.
As a best practice commit 'package-lock.json' separate to your other commits.






