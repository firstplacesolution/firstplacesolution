# First Place Solution


Document Contains following
- API Description


## API Description

## User



Registration API

| Path URL | v1/user/register |
| ------ | ------ |
| Method | POST |
| Content/Type | Application/Json |

```sh
 # Request Params :
 {
    "token" : "dummy",
    "phone" : "9575513319"
} 
```

```sh
# Success Respone :
{
    "status": true,
    "subCode": 200,
    "message": "User Registration",
    "error": "",
    "items": {
        "redirectTo": "onboard",
        "userDetails": {
            "phone": "9575513319",
            "token": "dummy",
            "_id": "6235d656cf5cea250d06a4c9",
            "createdAt": "2022-03-19T13:10:46.740Z",
            "updatedAt": "2022-03-19T13:10:46.740Z",
            "__v": 0
        }
    }
}
```








Onboard API

| Path URL | v1/investor/onbaord |
| ------ | ------ |
| Method | POST |
| Content/Type | Application/Json |

```sh
 # Request Params :
 {
    "user_id" : "623645b2f4cacb5123b7f36a",
    "full_name" : "Ashutosh Patidar",
    "email" : "ashu@gmail.com",
    "state" : "MadhyaPradesh",
    "city" : "Indore",
    "profile" : "",
    "refferal_code" : ""
}
```

```sh
# Success Respone :
{
    "status": true,
    "subCode": 200,
    "message": "User Onboard",
    "error": "",
    "items": {
        "user_id": "623645b2f4cacb5123b7f36a",
        "full_name": "Ashutosh Patidar",
        "profile": "",
        "email": "ashu@gmail.com",
        "state": "MadhyaPradesh",
        "city": "Indore",
        "referral_code": "",
        "_id": "6236468f025467611e0d8795",
        "createdAt": "2022-03-19T21:09:35.837Z",
        "updatedAt": "2022-03-19T21:09:35.837Z",
        "__v": 0
    }
}
```

