# AskTia Coding Challenge By Jacob Hyde

You will need NodeJS and [Angular CLI](https://github.com/angular/angular-cli) to run this project.

This project runs ExpressJS on port 3000 for the backend, and port 4200 on the frontend.

## Backend Server

Change your directory to the server folder.

Run `npm i` to install all npm packages.

Run `npm start` to start the ExpressJS server.

Go to http://localhost:3000

## Frontend

Written in Angular 5 using JS (ES6), TypeScript, Bootstrap 4, SASS, and HTML

In another terminal tab change the directory to the client folder.

Ensure you have angular-cli installed globally. Run `npm install -g @angular/cli` to do so.

run `npm i` to install all npm packages.

run `ng serve` to start the frontend server.

Go to http://localhost:4200 and then to http://localhost:4200/ledger/complicated-ledger

## Overview of Application

Express forwards all requests that are illegitimate ledger JSON files to / with a blank page.

The only route that returns ledger data is /ledger/:file. If a file is not found, you will be given a 404 HTTP status code, if a file is found, we open the file and begin process it.

First the ledger is searched for duplicate activity_id's, any duplicates are removed. A sort function is run on the ledger objects sorting by the newest date to the oldest.

The ledger is returned via a JSON string. All contents of a ledger object are returned in case the application was to expand in the future. 

An Angular service called ledger.service.ts is used to gather the data, and optimize the fields needed via an ledger interface.

The main component `ledger` is initalized at the start of the AngularJS web application. Using the router, /ledger/:file is listened to. If a file is pointed to that does not exist, the server returns a 404 status and we alert the user.

A valid route is /ledger/complicated-ledger

Clicking on the "Investing Account" will open a dropdown that has hardcoded files. Clicking on anyone of those files will change the transactions to that ledger file.

Transaction descriptions are simple yet descriptive enough to understand each transaction.

Bootstrap is used for a responsive layout.

The choice to use Angular was to demostrate a deep understanding of ES6 and TypeScript. Unit tests and E2E testing was not implemented, to ensure application usage and failures to fix.

## Deployment

To deploy this application, I created a two Docker containers for the server and frontend. Security measures on the server and within the application would be used for actual deployment. Security would be implemented to harden the actual server's OS, application level security such as CSRF tokens along with a rate limitter and other things would be implemented.

For production logging would be used, ideally a file similar to PHP's request file would be generated. The frontend client would be changed to port 80/443.