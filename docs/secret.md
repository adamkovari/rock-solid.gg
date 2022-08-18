### 1. Secrets
#### 1.1 Meteor secrets
1. in env.json

```json
{
  "public": {
    "publicKey": "1234"
  },
  "privateKey": "4567"
}
```
2. by running meteor
```js
meteor --settings env.json
```
3. in server-side
```js
Meteor.settings.privateKey
Meteor.settings.public.publicKey
```
4. in client-side

only
```js
Meteor.settings.public.publicKey
```
