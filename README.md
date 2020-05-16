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
NOTE: we have defined a single GET endpoint at this moment.

#3.3
CHALLENGE / TROUBLE : 
Having trouble in defining the response for a GET 
I want to return a JSON array.
We did find an existing example in the swagger provided spec.
BUT for future to remember is - that its not a big deal.
To return an array all we have to do is wrap javascript objects in []
Ex Response:
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
CHALLENGE / TROUBLE / TODO : 
Now the next challenge we are facing is defining the appropriate data types in swagger.
CHALLENGE / TROUBLE / TODO : what should the data types be used for 'Date' , 'Days' , 'Amount' , 'Comments'
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
Within the project we created(implictly) is a file called : 'package.json'
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

CHALLENGE / TROUBLE : while trying to commit code we now see that a file called 'package-lock.json' has changed.
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
We have decided on how we will get 'MOCKED' api responses.
We will need to follow three steps:
	Define the JSON SCHEMA ( rules ) of the response.
	Use this SCHEMA and 'json-schema-faker' to generate the response which will be saved to a json file.
	Use 'json server' to serve this generated json when a call is made to the endpoint.

Lets get started !

#4.3.1
Here we will define the 'JSON SCHEMA':
Create a js file within the folder 'buildScripts'

LEARNING: CRA comes bundled with 'webpack' , 'babel'
Reference:https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-create-react-app

PROBLEM and LEARNING:
We were not knowing how to run a script defined in 'package.json'
The command to run the script is :
npm run <script_name>

PROBLEM and LEARNING:
We were trying to run our script that was defined in 'package.json'
We also now know the command to be used to run these scripts.
However node / npm was complaining about 'unexpected token import'
This was happening because in our script we had the following line:
import chalk from "chalk";

We are trying to run the script from node / npm 
node / npm does NOT support ES6's import yet !!!
so if you are running scripts from node you cannot use 'import' 

rather you have to use :
var chalk = require("chalk");

Reference:https://stackoverflow.com/questions/39436322/node-js-syntaxerror-unexpected-token-import

PROBLEM and LEARNING:
Was getting an error 'console is undefined' while running our own script in 'package.json'
This was happening because when we try to run the script , node is NOT implicitly used.
In this case Windows was trying to run the js with its 'JScript engine' causing issues.
So the solution was to prepend my script with 'node'
Ex:
"scripts": {
    ...
    "generate-mock-data": "generateMockData"
  },

This was changed to:
"scripts": {
    ...
    "generate-mock-data": "node generateMockData"
  },

Reference: https://stackoverflow.com/questions/58651311/console-is-undefined-in-the-shell-by-using-webpack-with-node-js

DESIGN DECISION:
We now needed to place this custom script of ours within the project.
So we were not quite sure on how to structure our code and folder location for our custom script.
So we followed plural sight training of cory house and placed it in a folder called 'buildScripts' 
This folder is created inside the root of our project.
NOTE: Pluralsight course is NOT react specific , it is more around generic js 
but we have gone ahead and mimiced the same structure in our react project.
We then ran the script this way:
node buildScripts/generateMockDataGetEnergyBills

#4.3.2
So at this stage we were just running through multiple issues .
We have not even got to defining our schema .
We are going to define the schema using the standards defined here:
https://json-schema.org/

Some amount of duplication here. We already have the swagger spec defined and now for mock we are again defining the schema.

To define the schema we played around here till we got what we wanted:
https://json-schema-faker.js.org/#gist/1f1196844bead96e021ffbd597edcffa


Then the next step is to save this schema to a js file.
It has to be defined as a js variable and exported.
DESIGN DECISION:
where do we place this schema file for our mock response.
We decided to create a folder called 'api' within root of the project and placed this file here :
\energy-app-ui\src\api\mockEnergyBillSchema.js

So now we are ready with our schema file.

#4.3.3
We have the schema file which we will use with JSON Schema Faker.
Reference URL for JSON Schema Faker:
https://json-schema-faker.js.org/

We have already defined a script called 'buildScripts/generateMockDataGetEnergyBills.js' above.

However it is empty and really does not do anything.
Now we will use the PS course and copy from it into this file.

What is being done is really we are asking 'JSON Schema Faker' to use the schema file and write json output to a json file ! 


PROBLEM and LEARNING:
Couple of changes that we had to do were:
In the schema file we had to change the variable definition.
From:
export const getEnergyBillSchema = {
};

We had to change it to :
var getEnergyBillSchema = {
};
module.exports = getEnergyBillSchema;

This had to be done because this is being written in a node environment not yet ES6 / Typescript

PROBLEM and LEARNING:
Then while trying to use the schema and generate json response : I am running into issues in the js at following line:
var {getEnergyBillSchema} = require("../public/src/api/mockEnergyBillSchema.js");

Error: Cannot find module '../public/src/api/mockEnergyBillSchema.js'

So the change was:
var getEnergyBillSchema = require("../src/api/mockEnergyBillSchema.js");

So after this change run the command:
npm run generate-getEnergyBills-mock-data

So now we can see that the output json file is generated : db.json
So using the 'schema' and 'json-schema-faker' we have generated our response in a file !!! 

#4.3.4
Now we will use the 'json server' to serve up the response:
This is done by writing a startup script in package.json like this:
"scripts": {
	"start-mockapi": "json-server --watch src/api/db.json --port 3001"
}

We then invoke the script by running the following command on the console:
npm run start-mockapi

LEARNING:
The script: "start-mockapi": "json-server --watch src/api/db.json --port 3001"
Here we are starting the server and asking it to service requests by using the file 'src/api/db.json'
In this case our GET request will be provided with a response from the file: 'src/api/db.json'

We are also specifying that the server be started at port : 3001

PROBLEM and LEARNING:
"json-server requires at least version 10 of Node, please upgrade"

So this means we need to upgrade our node ! which we did 
( uninstalled node and reinstalled new node version )

So at this stage we have our mocking API up and running and providing response !
The mock server API end point is :
http://localhost:3001/energyBills

PROBLEM:
Swagger spec endpoint is /energy BUT mock api is exposing it as /energyBills

#4.3.5
We want the mock data to be regenrated everytime we start the mock server.
To achieve this we will define an additional script :
Before:
"scripts": {
	...
	"generate-getEnergyBills-mock-data": "node buildScripts/generateMockDataGetEnergyBills",
	"start-mockapi": "json-server --watch src/api/db.json --port 3001"
	...
}

Now:
"scripts": {
	...
	"generate-getEnergyBills-mock-data": "node buildScripts/generateMockDataGetEnergyBills"
	"prestart-mockapi": "npm run generate-getEnergyBills-mock-data"
	"start-mockapi": "json-server --watch src/api/db.json --port 3001"
	...
}

LEARNING:
In Node 'convention' is being used here .
when we run the script :
npm run start-mockapi then node will ALWAYS run any script it finds which has the same name as the script we are running if appended
with a 'pre'

so whenever we run the script : start-mockapi
node will first run the script : prestart-mockapi

As a result whenever we start the json server the json response is regenrated prior to server startup.

#4.3.6
We now finally also want to start our mock server everytime we run our app. ( run app and mock server in parallel )
To do this we first needed to install a utility called 'concurrently'
npm install concurrently --save-dev

'Concurrently' is a utility that allows us to execute tasks in parallel

Then we modified the scripts section 
We can achieve this by adding our 'start-mockapi' into our application start script.
LEARNING:
Before:
"scripts": {
	"start": "react-scripts start",
	"start-mockapi": "json-server --watch src/api/db.json --port 3001",
	...
}

After:
"scripts": {
	"start": "react-scripts start",
	"start-mockapi": "json-server --watch src/api/db.json --port 3001",
	...
	"dev": "concurrently \"npm start\" \"npm run start-mockapi\""
}

So we added an additional script and named it "dev"
what it is doing is it is using 'concurrently' to start react app ( by calling 'start') as well as start mock server
( by calling 'start-mockapi' ) 

References:
https://medium.com/@joelazarz/using-concurrently-with-json-server-and-your-react-app-3d07487acc50

LEARNING:
'json-server' can even be used to create / edit / delete data and it will get saved in the json file.
It actually serves like a database !!!

#5
We now have an API ready that is serving us the response.
It is now time to start developing React code to interact with this API.
CHALLENGE / TROUBLE :
How do we design and develop the React UI to talk to an API and display ?

#5.1
Slight diversion , we are looking at Cory House course on 'Flux and React' and so we 
will install some additional dev dependencies which will be required in future.
We will install 'flux' , 'react-router', 'bootstrap'
Command is :
npm install flux react-router bootstrap --save-dev

CHALLENGE / TROUBLE :
After doing this install we get following warning:
'found 2 vulnerabilities (1 low, 1 high)
 run `npm audit fix` to fix them, or `npm audit` for details'

#5.2
Cleanup of create-react-app:
We used the ready to use 'create-react-app' template to create our project.
However it comes with additional advanced things that we are not ready for.
So we will delete the following files from our project:
deleted:    src/App.css
deleted:    src/App.js
deleted:    src/App.test.js
deleted:    src/index.css
deleted:    src/logo.svg
deleted:    src/serviceWorker.js
deleted:    src/setupTests.js

Also we will remove all the content from the file: src/index.js
This file contained the code provided by 'create-react-app' which shows React's electron like screen.
We dont need this as we will be building our own application !

#5.3
Now finally we will begin writing some react code !

LEARNING:
when we write code like :
import React from "react";

The above is an example of using imports which were added to ES2015
This line says 'import an npm package called react and set it to a variable called 'react''

LEARNING:
React Component names should begin with a Capital letter.
React assumes that anything that starts with Capital letters is a 'component'

LEARNING:
By default when we write our components in files are private .
This is because 'create-react-app' is configured to use 'modules'
and as a result everything is private.
This is why they need to be 'exported'

CODE STRUCTURE:
All of our code we will write in a new directory called 'components'
This will be located here :
<project_root>\src\components

#5.3.1
Here we will write our first React Component that will be the HomePage.
This is standard stuff.
So we now have created some structure for our code and we have written our first simple landing page.

#5.4
We have one React Page created which is the landing page.
We will create another page : 'About'
Both these pages really do nothing but they will be a starting point.
We are just getting things ready before the action starts.

LEARNING:
We know that if we have muliple lnes of JSX to be returned they need to be wrapped in a parent level tag.
The option till now has been to wrap everything within a <div> tag.
However if we use <React.Fragment></React.Fragment> to enclose then react will not render
an additional <div> tag which is unnecessary anyway.

#5.5
Now we will do simple navigation between pages.
To do this we will add a new page called : App.js
This page will act like a 'Router'
In this page we read the browser url path and depending on path return appropriate page.
If the path is 'about' then it will return 'About' page.
In all other cases it will return 'HomePage'

This is just the setup .
It has not yet been used, which we will do next.

#5.6
In our entry point page : index.js we will now render the 'App.js'

ReactDOM.render(<App/>,document.getElementById("root"));
Now the 'App' component is rendered and since the default page to show is 'HomePage' it will show the HomePage.
Next we need a link in homepage to go to About Page.

#5.7
Simply add a <a href /> to the Home Page that links to the 'AboutPage'
Now when we load the application by default we will see the HomePage.
When we click on the link to 'About' it will go to AboutPage.

#5.8
Next we will define a Header component which will contain links to other pages.
This will act as the header for our web page.

LEARNING:
We used '<nav>' elements.
Ex:
<nav>
	<a href="/">Home</a> | <a href="/about">About</a>
</nav>

LEARNING:
In java script a function can be embedded inside another function !
Ex:
function Parent(){
	function Child(){}
   return(
	{Child()}
   );
}

#5.8.1
Now we will use the Header in our main component 'App.js'
So by doing this we will achieve the fact that the 'Header' will always show .
The actual page to display will be based on the link we click.
This is the code :
function App(){
    function getPage(){
        /** get the browser url path details and then dtermine which page to got to */
        const route = window.location.pathname;
        if(route === "/about"){
            return <AboutPage/>;
        }else{
            return <HomePage/>;
        }
    }
            
    return(
        <React.Fragment>
            <Header/>
            {getPage()}
        </React.Fragment>
    );  
}

CONCLUSION:
We now have a main Page ( App.js ) , which displays a header with two links.
The two links take us to the appropriate page.
So we also have two simple pages that we can navigate to .
Thats all till now.

#6
In earlier section

-----------------------------------------------------------------------------------------------------
UNKNOWN AREAS:
'npm shrinkwrap' , 'semver' , '^x.y.z'