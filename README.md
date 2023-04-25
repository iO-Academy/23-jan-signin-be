# year-cohort-projectName (eg: 22-jul-projectName)
This is the back-end RESTful API for the final project for the 2023 Woodchucks team at io Academy. 
The front-end can be found [here](https://github.com/iO-Academy/23-jan-signin-fe).

## Installation

Requires a mongoDB database to be set up with the name `OfficeGuestBook` and collection named `GuestBook`

To run the tests:
``bash
npm test
``

To start
``bash
nodemon app.js
``

## API Docs

***Sign in a new visitor***

**URL**

`/signin`

**Method:**

`POST`

**Body Content**

``
{
    "name":"Bob Gunderson"
    "company":"BobCo"
}
``

"company" is an optional parameter.

**Success Response**

``
{
    "msg": "Checked in successfully",
    "data": [
        {
            "name": "Bob Gunderson",
            "company": "BobCo",
            "checkInTime": "16:35"
        }
    ],
    "status": 200
}
``

**Failure Responses**

Empty Request

``
{
    "msg": "Error: Request cannot be empty",
    "data": [],
    "status": 500
}
``

Name is null

``
{
    "msg": "Error: Name cannot be null",
    "data": [],
    "status": 400
}
``

Failed to add to database

``
{
    "msg": "Error: Check in failed",
    "data": [],
    "status": 400
}
``