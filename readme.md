# Creating a Passenger Name Record
## Introducing this Code Sample

We offer an API called [Create Passenger Name Record](https://developer.sabre.com/docs/rest_apis/air/book/create_passenger_name_record/) (PNR) to help you prepare your travelers for their trip by creating a full reservation. Through using it, in one request, your application can do the following:

*	Create a PNR containing information for one or more travelers 
*	Add agency details
*	Book one or more air segments 
*	Halt processing based on acceptable pricing limits 

How can this API do several things in one request? It’s a software architecture design pattern referred to as an “orchestrated service.” We want to make the developer experience easier by bundling together several actions typically performed as part of an app’s user workflow. 

Creating a PNR is an important step in the [shop-and-book workflow](https://developer.sabre.com/docs/read/workflows/Book_Air_Segment). That influenced our choice to create a new sample app. It shows how software developers can call Create Passenger Name Record, parse the results, and display the content. Our goal is making it quicker for developers to get started using the API.

Consider this article as a partner to the sample app source code. You’ll find explanations and additional resources written here to add context whenever possible. Source code for the sample app is stored in a repo on our GitHub account. If you don’t know about GitHub, it’s a popular hosting provider for storing code using the git revision control system. Accessing our source code is free and easy.

What does the sample app look like when it runs? Here’s a screen shot:

![App Screenshot](./docs/CreatePNRScreen.jpg)

## Read the Article

There's [an article](https://blog.developer.sabre.com/) serving as a partner to this sample app source code. You’ll find explanations and additional resources written in it to add context whenever possible. 

## Watch the Screencast

There's a [screencast-style, code walkthrough video](https://youtu.be/gfnwtDiAaJ4), showing a way to approach this source code.

## Setting-up the Sample App

There are a few one-time only steps for installing pre-requisites listed below.

## Installing NodeJS

The sample app is written in **NodeJS**. You’ll need to have its run-time installed on your local development computer. If you’ve never installed NodeJS please refer to the [Node Foundation](https://nodejs.org/en/download/) to find an installer most appropriate for your O/S.
 
## Cloning with Git

Take a copy of the source code from our [repo stored on GitHub](https://github.com/SabreDevStudio/create-passenger-name-record-sample-nodejs). When you browse the PNR sample app repo you’ll find the green button labeled “clone”. Clicking it reveals the URL you’ll use to `git clone`, which is how source code is first copied down from the server to your computer. 

## Getting Sabre API Credentials

You’ll need your [Sabre REST APIs CERT-environment credentials](https://developer.sabre.com/resources/getting_started_with_sabre_apis/). They’re used by the sample app as part of the authentication flow to call Create Passenger Name Record.

## Installing Project Dependencies

Once you’ve installed NodeJS, and pulled down a copy of the source code, you’ll need to install the app’s open-source dependencies. That’s accomplished by running this command in the local copy of the source code:

`npm install`

The [npm](https://www.npmjs.com/) (Node Package Manager) tool will pull down copies of all open-source code this app refers to. File transfers might take a few minutes.

## Encoding Credentials

Using the APIs requires entering credentials so that the app can find them. Part of its logic is requesting a token in order to properly call the Create Passenger Name Record API. Tokens are gained in part from private credentials.

Simply open up the app’s source code and look at the file named [`Config.js`](./src/Config.js) to find where they’re declared. There are two attributes (`secret` and `pcc`) where values can be copied-in as hardcoded strings. Alternatively, they can be picked-up from O/S environment variables that you create on your local development machine.

```
exports.api = {
  endpoint: 'https://api.test.sabre.com',
  secret: process.env.SWS_API_SECRET || '',
  pcc: process.env.SWS_API_PCC || '',
};
```

Environment variables are preferred in this sample app because it keeps them hidden and protected. In this case all code is publicly visible in revision control, and that’s not the place for private information.

* `pcc` – is the pseudo city code (your agency’s unique identifier)
* `secret` – is a base64-encoded string computed from steps you can [read more about](https://developer.sabre.com/page/read/resources/getting_started_with_sabre_apis/how_to_get_a_token)

## Running the Sample App

The sample app is ready to run after setup. Enter this command in the local copy of the source code to run the sample app:

`npm start` 

When this works normally the app renders a status code from the API as well as the PNR. What you will see should look very similar to the image found above. Results match a flight origin and destination pair for a particular date and time.

## Updating the Search Criteria Config File

Changing flight search criteria is easy. Simply open up the app’s source code and look at the file named [`SearchCriteria.json`](./src/SearchCriteria.json) to find the flight information used to create a PNR. Update any of the attributes with valid values and restart the app to see the search results. 

```
{
  "flightNumber": "6020",
  "airlineCode": "DL",
  "departure": {
    "airportCode": "DFW"
  },
  "arrival": {
    "airportCode": "JFK"
  },
  "daysInAdvance": 14
}
```

Occasionally, the booking is prevented because the flight is not found. In that case adjust the `daysInAdvance` parameter to move it a little farther into the future. Certain flights simply don’t exist some days.

## Next Steps

Make use of this sample app as a testing tool. It’s a simple, flexible, jumping-off point for learning how to use Sabre APIs in general, and Create Passenger Name Record in particular. Look up the [PNR docs](https://developer.sabre.com/docs/rest_apis/air/book/create_passenger_name_record/) and discover all that it can do. Find something interesting? Call it by changing the request attribute values found in the file [`PNRModel.js`](./src/PNRModel.js). Save the file and run the app to see how the updates perform.

Get in touch with us. GitHub allows communication through its repo-level issue and pull request channels. Use the built-in [issues section](https://github.com/SabreDevStudio/create-passenger-name-record-sample-nodejs/issues).

We also have an [active community on Stack Overflow](https://stackoverflow.com/questions/tagged/sabre).

## License

Copyright (c) 2018 Sabre Corp Licensed under the MIT license.

## Disclaimer of Warranty and Limitation of Liability

This software and any compiled programs created using this software are furnished “as is” without warranty of any kind, including but not limited to the implied warranties of merchantability and fitness for a particular purpose. No oral or written information or advice given by Sabre, its agents or employees shall create a warranty or in any way increase the scope of this warranty, and you may not rely on any such information or advice.
Sabre does not warrant, guarantee, or make any representations regarding the use, or the results of the use, of this software, compiled programs created using this software, or written materials in terms of correctness, accuracy, reliability, currentness, or otherwise. The entire risk as to the results and performance of this software and any compiled applications created using this software is assumed by you. Neither Sabre nor anyone else who has been involved in the creation, production or delivery of this software shall be liable for any direct, indirect, consequential, or incidental damages (including damages for loss of business profits, business interruption, loss of business information, and the like) arising out of the use of or inability to use such product even if Sabre has been advised of the possibility of such damages.
 