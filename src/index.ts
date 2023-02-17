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
 * EBrowserLoggerLogLevel
 */
enum EBrowserLoggerLogLevel {
  'verbose' = 0,
  'info' = 1,
  'debug' = 2,
  'warn' = 3,
  'success' = 4,
  'error' = 5,
}

/**
 * BrowserLoggerLogColors
 */
type BrowserLoggerLogColors = {
  verbose?: string;
  info?: string;
  debug?: string;
  warn?: string;
  success?: string;
  error?: string;
};

/**
 * BrowserLoggerGlobalOptions
 */
type BrowserLoggerGlobalOptions = {
  appName?: string;
  logLevel?: EBrowserLoggerLogLevel;
  logColors?: BrowserLoggerLogColors;
};

const defaultBrowserLoggerLogColors: BrowserLoggerLogColors = {
  verbose: '#B9C1C6',
  info: '#2BA2E6',
  debug: '#914FF7',
  warn: '#EDAA2C',
  success: '#3ED553',
  error: '#EE451F',
};
export default class BrowserLogger {
  static globals: BrowserLoggerGlobalOptions = {
    logLevel: EBrowserLoggerLogLevel.verbose,
  };
  private tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private log(callee: string, ...message: any[]): void {
    if (parseInt(EBrowserLoggerLogLevel[callee as any]) >= BrowserLogger.globals!.logLevel!) {
      const colors = BrowserLogger.globals.logColors as any;
      const defaultColors = defaultBrowserLoggerLogColors as any;
      let color = colors && colors[callee] ? colors[callee] : defaultColors[callee];
      console.log(
        `%c (${callee.toUpperCase()})`,
        `color: ${color}`,
        `[${this.getTimestamp()}] ${BrowserLogger.globals.appName || ''}: ${this.tag}`,
        ...message,
      );
    }
  }
  verbose(...message: any[]) {
    this.log('verbose', ...message);
  }

  info(...message: any[]) {
    this.log('info', ...message);
  }

  debug(...message: any[]) {
    this.log('debug', ...message);
  }

  warn(...message: any[]) {
    this.log('warn', ...message);
  }

  success(...message: any[]) {
    this.log('success', ...message);
  }

  error(...message: any[]) {
    this.log('error', ...message);
  }
}
