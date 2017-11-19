
const fs = require('fs-extra');
const path = require('path');

const _ = require('lodash');

const ImageDownloader = require('image-downloader');
const ProgressBar = require('progress');
const logger = require('./logger');

/**
 * Main class responsible for downloading pins.
 */
class Downloader {

  /**
   * @param {PinterestService} pinterestService
   */
  constructor(pinterestService) {
    this.pinterestService = pinterestService;
  }

  /**
   * Downloads Pins from the specified Pinterest board.
   * @param {string} boardId The board id to Download pins from
   * @param {string} outputDir The directory to save the files.
   */
  async download(boardId, outputDir) {

    logger.info('Getting board info');
    const board = await this.pinterestService.getBoard(boardId);

    logger.info(`Fetching pins for board ${board.name}. This can take a while ...`);
    let pins = await this.pinterestService.getPins(boardId);

    let items = pins.items;
    let cursor = pins.cursor;

    // Getting all the pins!!
    while (cursor) {
      pins = await this.pinterestService.getPins(boardId, cursor);
      items = _.union(items, pins.items);
      cursor = pins.cursor;
    }

    return this.savePins(board, items, outputDir);
  }

  /**
   * Download a list of Pins.
   * @param {object} board
   * @param {array} pins
   */
  async savePins(board, pins, outputDir) {

    logger.info(`Downloading Pins for board ${board.name}`);

    fs.ensureDirSync(outputDir);

    const progress = new ProgressBar(':bar :current / :total Pins', { total: pins.length });
    for (const pin of pins) {

      const filePath = path.join(outputDir, this.generateFileNameForPin(pin));

      // only download if file doest not exist.
      try {
        await fs.stat(filePath);
      } catch (e) {
        await ImageDownloader.image({
          url: pin.imageUrl,
          dest: filePath
        });
      }

      progress.tick();
    }
  }

  /**
   * Generate a file name from the Pin properties.
   * @param {object} pin
   * @returns {string}
   */
  generateFileNameForPin(pin) {
    const created = pin.created;
    const formattedDate = `${created.getFullYear()}${created.getMonth() + 1}${created.getDate()}`;
    const ext = path.basename(pin.imageUrl).split('?')[0];
    return `${formattedDate}_${pin.id}.${ext}`;
  }
}

module.exports = Downloader;
