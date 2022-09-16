# rock-solid.gg

![Malphite](https://i.ytimg.com/vi/W_15VvMqPSQ/maxresdefault.jpg)

### Test site
#### Meteor test page
[rock-solid.gg](https://rock-solid.eu.meteorapp.com/)

#### Dashboard
[dashboard.meteor](https://eu-west-1.galaxy.meteor.com/)

### How to:
#### 1. Docker
##### 1.1 Build the docker file
``` js
docker build -t meteor-rock-solid .
```

##### 1.2 Run it 
###### at localhost:3000
``` js
docker run -it -p 3000:3000 meteor-rock-solid
```

##### 1.3 Deploy it
``` js
meteor deploy
```

#### 2. Local Env

Possibly you have the required environment installed

#### 2.1 
Create env.json in the root folder, with valid values
```json
{
  "XRiotToken": "",
  "public": {
    "rootURL": "",
    "assetURL": "",
    "regions" : {
      "NA": "americas",
      "BR": "americas",
      "LAN": "americas",
      "LAS": "americas",
      "KR": "asia",
      "JP": "asia",
      "EUNE": "europe",
      "EUW": "europe",
      "TR": "europe",
      "RU": "europe",
      "OCE": "sea"
    }
  },
  "packages": {
    "mongo": {
      "options": {
        "tlsAllowInvalidCertificates": true
      }
    }
  },
  "galaxy.meteor.com": {
    "env": {
      "MONGO_URL": ""
    }
  }
}
```

#### 2.2 Run it
``` js
meteor --settings env.json
```

### UI
[Figma docs](https://www.figma.com/file/zTD3BTXUBrWkWFcaPf1JA7/rock-solid.gg?node-id=0%3A1)

### Conception
[Confluence](https://rock-solid.atlassian.net/wiki/spaces/ROCKSOLIDG/pages/262145/Alapkoncepci)

### Sources:
1. [Build a docker image](https://dockerize.io/guides/docker-meteor-guide)
2. [Markdown it](https://markdown-it.github.io/)