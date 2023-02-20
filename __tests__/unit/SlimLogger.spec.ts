import SlimLogger, { ESlimLoggerColors } from '../../src/index';

const logger = new SlimLogger('tag');
const basicMessage = 'Hello world!';

describe('[UNIT] - SlimLogger', function () {
  it('Should include the app name if specified', function () {
    const name = 'My App';

    SlimLogger.Globals.appName = name;
    const logger = new SlimLogger('tag');
    const { appName } = logger.debug(basicMessage);
    expect(appName).toBe(name);

    SlimLogger.Globals.appName = undefined;

    const data = logger.debug(basicMessage);
    expect(data.appName).toBeUndefined();
  });

  it('Should log with default colors if not replaced', function () {
    const { color: color1 } = logger.verbose(basicMessage);
    const { color: color2 } = logger.info(basicMessage);
    const { color: color3 } = logger.debug(basicMessage);
    const { color: color4 } = logger.warn(basicMessage);
    const { color: color5 } = logger.success(basicMessage);
    const { color: color6 } = logger.error(basicMessage);

    expect(color1).toBe(ESlimLoggerColors.Gray);
    expect(color2).toBe(ESlimLoggerColors.BrightBlue);
    expect(color3).toBe(ESlimLoggerColors.BrightMagenta);
    expect(color4).toBe(ESlimLoggerColors.BrightYellow);
    expect(color5).toBe(ESlimLoggerColors.BrightGreen);
    expect(color6).toBe(ESlimLoggerColors.BrightRed);
  });
  it('Should log with provided colors if replaced', function () {
    SlimLogger.Globals.logColors = {
      debug: ESlimLoggerColors.BrightCyan,
    };
    const { color: color1 } = logger.debug(basicMessage);
    const { color: color2 } = logger.warn(basicMessage);

    expect(color1).toBe(ESlimLoggerColors.BrightCyan);
    expect(color2).toBe(ESlimLoggerColors.BrightYellow);

    SlimLogger.Globals.logColors = {
      debug: ESlimLoggerColors.BrightMagenta,
    };
  });
  it('Should correctly replace all provided params in the final message', function () {
    const { message } = logger.verbose('My name is {1} and I have {2} years old right now', 'Carlos', 28);
    expect(message.indexOf('Carlos') > -1).toBeTruthy();
    expect(message.indexOf('28') > -1).toBeTruthy();
  });

  it('Should stringify JSON params', function () {
    logger.verbose('Hello World in JSON {1}', { hello: 'world' });
  });
});
