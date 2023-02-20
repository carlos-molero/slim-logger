/**
 * MIT License
 *
 * Copyright (c) 2023 Carlos Molero Mata
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * ESlimLoggerColors
 */
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
  Reset = '\x1B[00m',
}
/**
 * ESlimLoggerLogLevel
 */
export enum ESlimLoggerLogLevels {
  'verbose' = 0,
  'info' = 1,
  'debug' = 2,
  'warn' = 3,
  'success' = 4,
  'error' = 5,
}
/**
 * SlimLoggerLogColors
 */
type SlimLoggerLogColors = {
  verbose?: ESlimLoggerColors;
  info?: ESlimLoggerColors;
  debug?: ESlimLoggerColors;
  warn?: ESlimLoggerColors;
  success?: ESlimLoggerColors;
  error?: ESlimLoggerColors;
};
/**
 * SlimLoggerGlobalOptions
 */
type SlimLoggerGlobalOptions = {
  appName?: string;
  logLevel?: ESlimLoggerLogLevels;
  logColors?: SlimLoggerLogColors;
  jsonPrettyPrint?: boolean;
};
type SlimLoggerLogOutput = {
  appName?: string;
  color: string;
  message: string;
  callee: string;
  tag: string;
};
/**
 * defaultSlimLoggerLogColors
 */
const defaultSlimLoggerLogColors: SlimLoggerLogColors = {
  verbose: ESlimLoggerColors.Gray,
  info: ESlimLoggerColors.BrightBlue,
  debug: ESlimLoggerColors.BrightMagenta,
  warn: ESlimLoggerColors.BrightYellow,
  success: ESlimLoggerColors.BrightGreen,
  error: ESlimLoggerColors.BrightRed,
};

/**
 * A simple logger library which wraps console.log API adding handy functionalities.
 */
export default class SlimLogger {
  static Globals: SlimLoggerGlobalOptions = {
    logLevel: ESlimLoggerLogLevels.verbose,
    jsonPrettyPrint: true,
  };
  private tag: string;

  /**
   * Creates a SlimLogger instance.
   *
   * @param {string} tag The name of the file where the logger is created
   */
  constructor(tag: string) {
    this.tag = tag;
  }
  /**
   * Returns the current timestamp.
   *
   * @returns {string} current ISO date string
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }
  /**
   * Calls the console.log function.
   *
   * @param {string} callee the callee function name
   * @param {string} message
   * @param {any[]} params
   *
   * @returns {SlimLoggerLogOutput} SlimLoggerLogOutput
   */
  private log(callee: string, message: string, ...params: any[]): SlimLoggerLogOutput {
    let color;
    let parametrizedMessage = message;

    if (Number(ESlimLoggerLogLevels[callee as any]) >= SlimLogger.Globals!.logLevel!) {
      const colors = SlimLogger.Globals.logColors as any;
      const defaultColors = defaultSlimLoggerLogColors as any;
      color = colors && colors[callee] ? colors[callee] : defaultColors[callee];
      parametrizedMessage = this.replacePlaceholdersByParams(message, params);

      console.log(
        `${color}[${this.getTimestamp()}] - ${callee.toUpperCase()} ${
          SlimLogger.Globals.appName ? '- ' + SlimLogger.Globals.appName.toUpperCase() + ' -' : '-'
        } #${this.tag}: ${parametrizedMessage}${ESlimLoggerColors.Reset}`,
      );
    }

    return {
      appName: SlimLogger.Globals.appName,
      color,
      message: parametrizedMessage,
      callee,
      tag: this.tag,
    };
  }
  /**
   * Iterates over each param replacing the placeholder by its value.
   *
   * @param {string} message
   * @param {any[]} params
   *
   * @returns {string}
   */
  private replacePlaceholdersByParams(message: string, ...params: any[]): string {
    if (!params || params[0].length === 0) return message;
    params[0].forEach((p: any) => {
      const index = params[0].indexOf(p);
      const isObject = typeof params[0] === 'object' && Object.keys(p).length > 0;
      const value = isObject
        ? JSON.stringify(params[0][index], undefined, SlimLogger.Globals.jsonPrettyPrint ? 2 : undefined)
        : params[0][index];
      message = message.replace(`{${index + 1}}`, value);
    });
    return message;
  }

  /**
   * Logs a verbose message.
   *
   * @param message
   * @param params
   *
   * @returns {SlimLoggerLogOutput} SlimLoggerLogOutput
   */
  verbose(message: string, ...params: any[]): SlimLoggerLogOutput {
    return this.log('verbose', message, ...params);
  }
  /**
   * Logs an info message.
   *
   * @param message
   * @param params
   *
   * @returns {SlimLoggerLogOutput} SlimLoggerLogOutput
   */
  info(message: string, ...params: any[]): SlimLoggerLogOutput {
    return this.log('info', message, ...params);
  }
  /**
   * Logs a debug message.
   *
   * @param message
   * @param params
   *
   * @returns {SlimLoggerLogOutput} SlimLoggerLogOutput
   */
  debug(message: string, ...params: any[]): SlimLoggerLogOutput {
    return this.log('debug', message, ...params);
  }
  /**
   * Logs a warn message.
   *
   * @param message
   * @param params
   *
   * @returns {SlimLoggerLogOutput} SlimLoggerLogOutput
   */
  warn(message: string, ...params: any[]): SlimLoggerLogOutput {
    return this.log('warn', message, ...params);
  }
  /**
   * Logs a success message.
   *
   * @param message
   * @param params
   *
   * @returns {SlimLoggerLogOutput} SlimLoggerLogOutput
   */
  success(message: string, ...params: any[]): SlimLoggerLogOutput {
    return this.log('success', message, ...params);
  }
  /**
   * Logs an error message.
   *
   * @param message
   * @param params
   *
   * @returns {SlimLoggerLogOutput} SlimLoggerLogOutput
   */
  error(message: string, ...params: any[]): SlimLoggerLogOutput {
    return this.log('error', message, ...params);
  }
}
