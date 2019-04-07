# @emit-js/returns

[emit](https://github.com/emit-js/emit#readme) return value definitions

![returns](returns.gif)

## Install

```bash
npm install @emit-js/returns @emit-js/log @emit-js/type
```

## Setup

```js
var emit = require("@emit-js/emit")()

require("@emit-js/log")(emit)
require("@emit-js/type")(emit)
require("@emit-js/returns")(emit)
```

## Usage

```js
emit("returns", "test", "boolean")

emit.any("test", function() {
  return true
})
```
