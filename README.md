# year-cohort-projectName (eg: 22-jul-projectName)
This is the back-end RESTful API for the final project for the 2023 Woodchucks team at io Academy.
The front-end can be found [here](https://github.com/iO-Academy/23-jan-signin-fe).

## Installation

Requires a mongoDB database to be set up with the name `OfficeGuestBook` and collections named `GuestBook` and `Admin`.
`Admin` should contain at least one admin code otherwise it will not be possible to access the admin panel on the front end.
Codes should be formatted like `"code":1234` in the collection.

Once cloned run the below to install dependencies.
````
npm i
````

To run the tests:

```
npm test
```

To start

```
nodemon app.js
```

## API Docs

***Sign in a new visitor***

**URL**

`/signin`

**Method:**

`POST`

**Body Content**

```
{
    "name":"Bob Gunderson",
    "company":"BobCo"
}
```

"company" is an optional parameter.

**Success Response**

```
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
```

**Failure Responses**

Empty Request

```
{
    "msg": "Error: Request cannot be empty",
    "data": [],
    "status": 500
}
```

Name is null/empty

```
{
    "msg": "Error: Name cannot be null/empty",
    "data": [],
    "status": 400
}
```

Failed to add to database

```
{
    "msg": "Error: Check in failed",
    "data": [],
    "status": 400
}
```

Non-json data posted

```
{
    "msg": "Error: Only JSON content is permitted",
    "data": [],
    "status": 400
}
```

***Verify Admin Key Code***

**URL**

`/verify`

**Method:**

`POST`

**Body Content**

```
{
    "code":4004
}
```

**Success Response**

Code passes
```
{
    "msg": "Code authentication successful",
    "data": [
        {
            "authenticated": true
        }
    ],
    "status": 200
}
```

Code fails

```
{
    "msg": "Code authentication failed",
    "data": [
        {
            "authenticated": false
        }
    ],
    "status": 401
}
```

**Failure Responses**

Empty request

```
{
    "msg": "Error: Request cannot be empty",
    "data": [],
    "status": 500
}
```

Null code

```
{
    "msg": "Error: Code cannot be null",
    "data": [],
    "status": 500
}
```

Non-Numeric code

```
{
    "msg": "Error: Code must be numeric",
    "data": [],
    "status": 500
}
```

Code is incorrect length

```
{
    "msg": "Error: Code must be 4 digits",
    "data": [],
    "status": 500
}
```

Non-json data posted

```
{
    "msg": "Error: Only JSON content is permitted",
    "data": [],
    "status": 400
}
```

***Get all active sign ins***

**URL**

`/activeSignIns`

**Method:**

`GET`

**Success Response**

Active Sign ins found

```
{
    "msg": "Records retrieved successfully",
    "data": [
            {
                "_id": "64492b4aac1551ec63a0ac51",
                "name": "jog",
                "company": null,
                "checkInTime": "14:46"
            },
            {
                "_id": "6449501c6228521e9ba38c12",
                "name": "john",
                "company": "johnCo",
                "checkInTime": "17:23"
            }
    ],
    "status": 200
}
```

No active sign ins

```
{
    "msg": "No matching records found",
    "data": [],
    "status": 200
}
```

***Search Sign for sign in by name***

**URL**

`/activeSignIns`

**Method:**

`GET`

**Body:**

```
{
    "name":"j"
}
```

**Success Response**

Records Found

```
{
    "msg": "Records retrieved successfully",
    "data": [
            {
                "_id": "64492b4aac1551ec63a0ac51",
                "name": "jog",
                "company": null,
                "checkInTime": "14:46"
            },
            {
                "_id": "6449501c6228521e9ba38c12",
                "name": "john",
                "company": "johnCo",
                "checkInTime": "17:23"
            }
    ],
    "status": 200
}
```

No matches found

```
{
    "msg": "No matching records found",
    "data": [],
    "status": 200
}
```

**Failure Responses**

Empty Request

```
{
    "msg": "Error: Request cannot be empty",
    "data": [],
    "status": 500
}
```

Name is null/empty

```
{
    "msg": "Error: Name cannot be null/empty",
    "data": [],
    "status": 400
}
```