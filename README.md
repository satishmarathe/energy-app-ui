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
CHALLENGE / TROUBLE / TODO : defining appropriate data types in Swagger

#3.6
CHALLENGE / TROUBLE : The other trouble we were having was : we were returning an array without array name.
Ex:
[
  {
    "id": 0,
    ...
  }
]

Now this was returning an array without an array name.
We wanted to change it to:
{
  "energyBills": [
    {
      "id": 0,
      ...
    }
  ]
}

So we had to make changes to the swagger spec to achieve the above.
You can look at the following commit in github which is specific to achieving this:
https://github.com/satishmarathe/energy-app-ui/commit/f4be97a2de12a6962f30ed712fa0addb3302a16b

OLD SPEC:
type: array
	items:
		$ref: '#/definitions/Energy'
CHANGED SPEC:
type: object
	properties:
		energyBills:
			type: array
				items:
					$ref: '#/definitions/Energy'

References:
https://softwareengineering.stackexchange.com/questions/286293/whats-the-best-way-to-return-an-array-as-a-response-in-a-restful-api
https://stackoverflow.com/questions/10164741/get-jsonarray-without-array-name

#4
Now that we have defined the swagger spec , we have defined the response structure.
So we now need to develop our front end using this response structure.

#4.1
We do not want to wait for the backend api to be developed and running to develop / test our front end.
CHALLENGE / TROUBLE : How do we achieve this ?

We have identified that we will need 'Json Server' for above requirement.
We jave also identified that we will need 'JSON Schema Faker'
Now we need to install this in our project.

CHALLENGE / TROUBLE : how do we install 'Json Server' and 'JSON Schema Faker'?
'Create react app' that we used to create our react app uses node and npm.
Within the project we created is a file called : 'package.json'
This file is like our maven pom file which will contain dependencies.

We can define within this file 'dev dependencies' and 'production dependencies'

We need the JSON server and 'JSON Schema Faker' only in development.
So here is the command we will use :
npm install json-server --save-dev
npm install json-schema-faker --save-dev

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

LEARNING: if someone else clones this repo - they will need to install all the packages / dependencies .
To do this run the command : npm install
This will install all the packages / dependencies on their machine.
These dependencies get installed in a folder within your project called 'node_modules'

Another interesting thing is GIT does not complain about this folder changing : 'node_modules'
This is because in '.gitignore' this folder has been specified to be ignored !

LEARNING: looking at 'node_modules' shows that 'express' , 'webpack' to be present.
So probably CRA is automatically installing them.

LEARNING: express is best if server side is also being developed in js ( node as one example ) 
If server side is being developed in Non js technology ( java ) then express is overkill.

#4.3
We have decided on how we will 






UNKNOWN AREAS:
'npm shrinkwrap' , 'semver' , '^x.y.z'