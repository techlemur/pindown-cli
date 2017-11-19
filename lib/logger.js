const chalk = require('chalk');

/**
 * This class contains helper methods for Print beautyfull log messages.
 */
class Logger {

  /**
   * Prints an "info" message
   * @param {string} message The message to log
   */
  static info(message) {
    console.log(chalk.yellow(message));
  }

  /**
   * Prints an "error" message
   * @param {string} message The message to log
   */
  static error(message) {
    console.error(chalk.red(message));
  }

  /**
   * Prints an "ok" message.
   * @param {string} message The message to log
   */
  static ok(message) {
    console.log(chalk.green(message));
  }
}

module.exports = Logger;
