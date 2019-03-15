# mirror

httpmirror, reply with the request details, so you can know what exactly your http client sent.

## Usage

### CLI mode

You can install mirror as a global npm package and run:

```bash
npm i -g httpmirror
mirror --help
mirror -p 9500
# or use npx
npx httpmirror --help
```

### Node package mode

You can also include mirror into your application:

```js
const Mirror = require('httpmirror')

const mirror = Mirror({ log: false, port: 8080, bindall: true })
mirror.start().then(msg => console.log(msg))
```
