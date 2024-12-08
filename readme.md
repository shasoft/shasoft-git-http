## Git Api с синхронными функциями

За основу взят пакет [octocat.js](https://github.com/SamyPesse/octocat.js)

```js
const GitHub = require('octocat');

// Using an access token
const client = new GitHub({
    token: 'my-access-token'
});

// Get a single user
const user = client.user('SamyPesse');
user.info().then(function(infos) { ... });

// Get the authenticated user
const user = client.me();
```

и к нему добавляются аналогичные синхронные методы с суффиксом `Sync`

```js
const createGitHttpApi = require('shasoft-git-http');

// Создать API по токену доступа
const client = createGitHttpApi('my-access-token'[,url]);

// Получить данные пользователя
const user = client.userSync('SamyPesse');
const infos = user.infoSync();

// Получить данные текущего пользователя
const user = client.meSync();
```

При этом остаётся поддержка асинхронных методов исходного пакета

Пакет поддерживает 
1. [GitHub](https://github.com) url=`https://api.github.com` (_значение по умолчанию_)
1. [Gitea](https://about.gitea.com/) url=`<протокол://домен:порт>/api/v1`