const yargs = require('yargs');
const pkg = require('../package.json');
const PinterestService = require('./pinterestService');
const Downloader = require('./downloader');
const PDK = require('node-pinterest');
const logger = require('./logger');

const args = yargs
  .version(pkg.version)
  .usage('Usage: $0 --board [board] --token [accessToken] --out [output]')
  .describe('board', 'The Id of the pinterest board')
  .describe('accessToken', 'The pinterest access token')
  .describe('output', 'The folder where to save the files')
  .alias('t', 'accessToken')
  .alias('o', 'output')
  .alias('b', 'board')
  .demandOption(['board', 'accessToken', 'output'])
  .help('h')
  .alias('h', 'help')
  .argv;

const pinterestClient = PDK.init(args.accessToken);

const downloader = new Downloader(new PinterestService(pinterestClient));

downloader.download(args.board, args.output).then(() => {
  logger.ok('Pins saved with success!');
}).catch((e) => {
  logger.error(e);
});

