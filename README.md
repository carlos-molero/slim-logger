# Slim Logger

[![Tests](https://github.com/carlos-molero/slim-logger/actions/workflows/test.yml/badge.svg)](https://github.com/carlos-molero/pure-js-mapper/actions/workflows/test.yml)
![Version](https://img.shields.io/badge/Version-1.0.4-blue)

A simple logger library which wraps console.log API adding handy functionalities. It can be used both in the browser and server-side.

Logs are colored thanks to the use of ANSI codes so they should be colored both in terminal and in the browser console.

## Installation

npm

```bash
npm i @carlosmta/slim-logger
```

yarn

```bash
yarn add @carlosmta/slim-logger
```

## Importing/Requiring

The library output is CommonJS for maximum compatibility.

```javascript
const SlimLogger = require('@carlosmta/slim-logger').default; // CommonJS
import SlimLogger from '@carlosmta/slim-logger'; // ES
```

## Usage

```javascript
const logger = new SlimLogger('tagName');
logger.debug('Hello world!');

// [2023-02-17T16:05:26.217Z] - DEBUG - #tagName: Hello world!
```

## API

### Global properties

There are some properties that can be set for all class instances statically.

- **Colors**

```javascript
// Replaces the debug log color
SlimLogger.Globals.logColors = {
  debug: ESlimLoggerColors.BrightCyan,
};
```

All the possible options are inside this enum, which is exported for convenience:

```javascript
export enum ESlimLoggerColors {
  Black = '\x1b[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
  BrightBlack = '\x1b[90m',
  BrightRed = '\x1b[91m',
  BrightGreen = '\x1b[92m',
  BrightYellow = '\x1b[93m',
  BrightBlue = '\x1b[94m',
  BrightMagenta = '\x1b[95m',
  BrightCyan = '\x1b[96m',
  BrightWhite = '\x1b[97m',
  Gray = '\x1b[90m',
  Grey = '\x1b[90m',
  BrightGray = '\x1b[37;1m',
  BrightGrey = '\x1b[37;1m',
}
```

By default, log colors will be the following:

```javascript
const defaultSlimLoggerLogColors: SlimLoggerLogColors = {
  verbose: ESlimLoggerColors.Gray,
  info: ESlimLoggerColors.BrightBlue,
  debug: ESlimLoggerColors.BrightMagenta,
  warn: ESlimLoggerColors.BrightYellow,
  success: ESlimLoggerColors.BrightGreen,
  error: ESlimLoggerColors.BrightRed,
};
```

- **Log level**

`ESlimLoggerLogLevels.verbose` by default.

```javascript
// Only error logs will be shown
SlimLogger.Globals.logLevel = ESlimLoggerLogLevels.error;
```

- **App name**

```javascript
SlimLogger.Globals.appName = 'My App';
logger.debug('Hello world!');

// [2023-02-17T16:05:26.217Z] - DEBUG - MY APP - #tagName: Hello world!
```

- **JSON Pretty print**

```javascript
SlimLogger.Globals.jsonPrettyPrint = true; // default
```

### Parameters

I decided to follow a similar approach to the popular Java logging library: [log4j](https://logging.apache.org/log4j/2.x/), the second argument that the functions accept to log messages is an array of parameters that will be substituted according to the order in which they are added.

```javascript
logger.verbose('My name is {1} and I have {2} years old right now', 'Carlos', 28);

// [2023-02-17T16:05:26.225Z] - VERBOSE - #tagName: My name is Carlos and I have 28 years old right now
```
