# MongoDB Social Media Backend 

## Table of Contents
### -[Description](#description)
### -[Video](#video)
### -[Technologies](#technologies)
### -[Usage](#usage)
### -[Questions](#questions)

## Description

In this project, we were tasked with creating a back-end for a social media site using MongoDB. A 'user' can create a profile with a username and email address, which appears in Insomnia. when the user is created, they are now able to have 'friends' and 'thoughts,' both of which are represented by the empty arrays in their object models. A user can create a thought, and the '_id' of that thought will appear in the 'thoughts' array of the object model. The 'friends' array is populated when a user adds a friend to their friend list. That user's '_id' is also visible in the 'friends' array after they have been added. A user may also react to a post, which is a subdocument in the Thought model. Reactions will appear in the 'thought' object's 'reactions' array. If you use a GET request on a single user, you will find all their associated thoughts and friends as well. 

Aside from GET requests and the POST requests fulfilling user, friend, thought, and reaction creation, you can also update a user's profile with a PUT request, or fully delete a reaction from the thought object, a friend from the user's friend array, a thought from their thought array, or the user themselves. In the video walkthough (posted below), I demonstrate how each of these requests work.

## Video
### Please follow the link below for a walkthrough of how the Employee Generator works:

https://drive.google.com/file/d/1T_x4IKMJvTVJHYZY9uWlBZkDYDY3YDBG/view?usp=sharing

## Technologies

Built with: Javascript, Mongoose, Express.js, and date-fns.

## Usage

Run 'npm i' to install all packages, before running 'npm start' to invoke the application. Once confirmed that the server is listening, navigate to Insomnia and run 'localhost:3001' to test the routes.

### Questions

Please reach out via GitHub with any questions or concerns: 

https://github.com/mtpott