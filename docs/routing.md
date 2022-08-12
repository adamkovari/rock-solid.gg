### 1. Package

[akryum:vue-router2](https://github.com/meteor-vue/vue-meteor/tree/master/packages/vue-router2#installation)

#### 2. Client/routes.js

``` js
RouterFactory.configure(factory => {
// Simple routes
factory.addRoutes([
{
path: '/search',
name: 'search',
component: Search,
},
{
path: '/champs',
name: 'champs',
component: Champs,
},
{
path: '/settings',
name: 'settings',
component: Settings
}
])
})
```