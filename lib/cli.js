const yargs = require('yargs');
const pkg = require('../package.json');
const PinterestService = require('./pinterestService');
const Downloader = require('./downloader');
const PDK = require('node-pinterest');
const logger = require('./logger');

const args = yargs
  .version(pkg.version)
  .usage('Usage: $0 --saveformat [saveformat] --board [board] --token [accessToken] --out [output]')
  .describe('board', 'The Id of the pinterest board')
  .describe('accessToken', 'The pinterest access token')
  .describe('output', 'The folder where to save the files')
  .alias('t', 'accessToken')
  .alias('o', 'output')
  .alias('b', 'board')
  .alias('s', 'saveformat')
  .demandOption(['board', 'accessToken', 'output'])
  .default('saveformat',1)
  //.demandOption(['board', 'accessToken', 'output'])
  .help('h')
  .alias('h', 'help')
  .argv;

const pinterestClient = PDK.init(args.accessToken);

const downloader = new Downloader(new PinterestService(pinterestClient));

downloader.download(args.board, args.output, args.saveformat).then(() => {
  logger.ok('Pins saved with success!');
}).catch((e) => {
  logger.error(e);
});

