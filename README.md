# Pindown-cli

>  Cli tool for downloading entire albums from Pinterest

## Why I build this tool?

I use [Pinterest](http://pinterest.com) a lot for saving images I found in the web that I want to keep for later. I wanted a way to save all that images to my Laptop for backup purposes and better organization.

## Install

This tool is built with [NodeJS](https://nodejs.org), so you can easily install with NPM:

```
npm -g install pindown-cli
```

## Usage

For using this tool, you must have:
- A [Pinterest](https://pinterest.com) account.
- A valid Pinterest API access token with "read_public" and "read_relationships" permissions. You can generate one [here](https://developers.pinterest.com/tools/access_token/).
- Due to limitations of Pinterest API, your boards must be public to be able to download any pins.

With that, you can execute the tool like this:

```
pindown -b=<board> -o <mytargetfolder> -t=<access_token>
```

Where:
- -b : The board id to Download (Note: see the [FAQ](FAQ) for instructions how to find your board id)
- -t : The access token you got from Pinterest.
- -o : The folder where to Download the pins.

## FAQ

#### How can I know my board id?

- Pinterest interface doesnt provide a simple way to see the id of any board. You can use [this](https://www.nutt.net/how-do-i-get-pinterest-board-id/) site, to get your board id, from the board url.


## Contributing

I made this tool for a very particular personal use case. If you find it usefull, feel free to fork or to improve this tool.

For more detailed instructions how to contribute, please read[contributing.md](contributing.md).

## License

MIT
