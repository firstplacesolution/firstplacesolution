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

