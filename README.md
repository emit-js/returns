# @dot-event/returns

![returns](returns.gif)

## Install

```bash
npm install @dot-event/returns @dot-event/log @dot-event/type
```

## Setup

```js
var dot = require("dot-event")()

require("@dot-event/log")(dot)
require("@dot-event/type")(dot)
require("@dot-event/returns")(dot)
```

## Usage

```js
dot("returns", "test", { arg: "boolean" })

dot.any("test", function() {
  return true
})
```
