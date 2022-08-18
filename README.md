# rock-solid.gg

![Malphite](https://i.ytimg.com/vi/W_15VvMqPSQ/maxresdefault.jpg)

### Test site
#### Meteor dashboard
[rock-solid.gg](https://rock-solid.eu.meteorapp.com/)

#### Dashboard
[dashboard.meteor](https://eu-west-1.galaxy.meteor.com/)

### How to:
#### 1. Build the docker file
``` js
docker build -t meteor-rock-solid .
```

#### 2. Run it 
###### at localhost:3000
``` js
docker run -it -p 3000:3000 meteor-rock-solid
```

#### 3. Deploy it
``` js
meteor deploy
```

#### 4. UI
[Figma docs](https://www.figma.com/file/zTD3BTXUBrWkWFcaPf1JA7/rock-solid.gg?node-id=0%3A1)

#### 5. Conception
[Confluence](https://rock-solid.atlassian.net/wiki/spaces/ROCKSOLIDG/pages/262145/Alapkoncepci)

### Sources:
1. [Build a docker image](https://dockerize.io/guides/docker-meteor-guide)
2. [Markdown it](https://markdown-it.github.io/)