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


