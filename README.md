![PhiDo](icon/PhiDo-32x32.png)

**PhiDo** (aka **φ道**) is a Fidonet browser with a GUI.

* Its name means “the Golden Path”, where “φ” represents [the golden ratio](http://en.wikipedia.org/wiki/Golden_ratio) and “道” means “path”.

* Its name sounds like the Russian “Фидо” that means “Fido” (as in “Fidonet”).

**Note:**   the application is currently in an early phase of its development and thus does not have even minimal feature completeness. However, it already supports some [FGHI URLs](https://github.com/Mithgol/FGHI-URL) and [Fidonet avatars](https://github.com/Mithgol/node-fidonet-jam/blob/master/avatar.txt).

[![(FGHI URL)](http://img.shields.io/badge/FGHI-URL-57ab1e.svg)](https://github.com/Mithgol/FGHI-URL) [![(Fidonet avatars)](http://img.shields.io/badge/Fidonet-avatars-57ab1e.svg)](https://github.com/Mithgol/node-fidonet-jam/blob/master/avatar.txt)

## Requirements

* PhiDo is written in HTML5 + CSS + JavaScript and requires [node-webkit](https://github.com/rogerwang/node-webkit) to run.

* Have 2 Gb RAM (or more). When PhiDo renders large Fidonet echomail areas (thousands of messages) and Firefox is running in background, if the system has only 1 Gb RAM (or less), swapping occurs inevitably.

* PhiDo currently requires **Node.js** and **npm** for installation of dependencies. For futher versions of PhiDo the distribution of complete packages (with dependencies included) is planned.

* PhiDo currently supports only the JAM [(Joaquim-Andrew-Mats)](https://github.com/Mithgol/node-fidonet-jam/blob/master/JAM.txt) type of Fidonet message bases.

* PhiDo currently uses [HPT](http://husky.sourceforge.net/hpt.html)'s area configuration file as the description of echomail areas.

* PhiDo does not currently create any lock files, not does it lock files in use. Users themselves have to prevent their echoprocessors (tossers) or mail editors from running when PhiDo is active.

## Installing PhiDo

1. Make sure that **Node.js** and **npm** are installed. (Follow the “[Installation](https://github.com/joyent/node/wiki/Installation)” article in the Node's wiki. You may prefer [installing without building](https://github.com/joyent/node/wiki/Installation#installing-without-building), especially on Windows.)

2. Download the [ZIP-packed](https://github.com/Mithgol/phido/archive/master.zip) source code of PhiDo and unpack it to some directory. Then run `npm install --production` in that directory.

3. Download [node-webkit](https://github.com/rogerwang/node-webkit). Either unpack it to the PhiDo's directory or put in some other directory. In the latter case, add the node-webkit's directory to your system's `PATH` variable's value (unless you plan to use the verbose node-webkit's path when you launch PhiDo).

### Setting up

Copy `phido.conf-example` to `phido.conf` and edit in your favourite text editor.

The following configuration options are supported (in arbitrary order):

* `ConfigGoldED` — path to the configuration file of GoldED (or GoldED+, or GoldED-NSF). This setting allows to use PhiDo alongside the popular Fidonet mail editor (GoldED) when the former uses some settings of the latter.

* `EncodingGoldED` — the encoding of non-ASCII characters in the GoldED config file. By default, `utf8` is used. You may use any encoding provided by the [singlebyte](https://github.com/Mithgol/node-singlebyte) module.

* `AreasHPT` — path to the area configuration file of HPT. This setting is necessary for PhiDo to know where the echomail resides.
   * The configuration lines for echomail are exprected to start with `EchoArea` (literally), then a whitespace-separated echotag (such as `Ru.FTN.Develop` for example), then a whitespace-separated full path (without the extensions) to the echomail files of the area, in that order. (A sequence of several whitespaces is also a supported separator.) The rest of the configuration line is also whitespace-separated from the path.
   * If the `-d "some description"` is found on the line, it is used as the echomail area's description.
   * Only JAM echomail areas are supported. Names of echo base files are generated by appending lowercase extensions (`.jhr`, `.jdt`, `.jdx`, `.jlr`) to the given path.

* `EncodingHPT` — the encoding of non-ASCII characters in the HPT areafile. By default, `utf8` is used. You may use any encoding provided by the [singlebyte](https://github.com/Mithgol/node-singlebyte) module.

* `UserName` — the user's name. May be borrowed from GoldED's configuration if omitted in PhiDo's.

* `AreaSep` — descriptions of separators between areas in the arealist. May be borrowed from GoldED's configuration if omitted in PhiDo's. Each separator consists of the following elements (separated with one or more spaces):
   * `AreaSep` (literally)
   * areatag (such as `Ru.FTN.Develop` for example)
   * `"separator text"` (in double quotes)
   * group ID (number, currently ignored)
   * group type (currently only `Echo` separators are displayed)

An alpha version of PhiDo, meant for testing, may display developer's toolbar at the top of its window. You may change `"toolbar": true` to `"toolbar": false` in `package.json` to hide the toolbar.

## Launching PhiDo

Run `nw .` in the PhiDo's directory.

**Note:** if node-webkit resides in another directory and you won't add that directory to your system's `PATH` variable's value, then you should use a verbose (absolute or relative) path to the node-webkit's executable. (On Windows you may use the `start.bat` file as an example and edit it according to your circumstances.)

## Testing PhiDo

[![(build testing status)](https://travis-ci.org/Mithgol/phido.svg?branch=master)](https://travis-ci.org/Mithgol/phido)

It is necessary to install [JSHint](http://jshint.com/) for testing.

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of PhiDo).

After that you may run `npm test` (in the directory of PhiDo). Only the JS code issues are caught.

## License

The source code is MIT-licensed (see `LICENSE`), with the following exceptions:

* The file `jq/$.js` contains [jQuery](http://jquery.com/) which is also [MIT-licensed](https://jquery.org/license/) but has its own authors (jQuery Foundation and other contributors).
   * The file `jq/jquery.color.min.js` contains [jQuery Color](https://github.com/jquery/jquery-color) plugin by jQuery Foundation and other contributors, [MIT-licensed](https://jquery.org/license/).
   * The file `jq/jquery.hotkeys.js` contains [jQuery Hotkeys Plugin](https://github.com/jeresig/jquery.hotkeys) by John Resig (dual licensed under the MIT or GPL Version 2 licenses).
   * The file `jq/scrollspy.js` contains [scrollSpy](https://github.com/thesmart/jquery-scrollspy), a jQuery plugin by John Smart (MIT-licensed).
   * The file `jq/jquery.scrollTo.min.js` contains [jQuery.scrollTo](https://github.com/flesler/jquery.scrollTo), a jQuery plugin by Ariel Flesler (MIT-licensed).

* Fonts in the `paratype` directory are published [by ParaType](http://www.paratype.com/public/) on the terms of [ParaType Free Font Licensing Agreement](http://www.paratype.com/public/pt_openlicense_eng.asp). (See the `PT Free Font License*.txt` files in the same folder.)

* The directory `bootstrap` contains [Bootstrap](http://getbootstrap.com/) licensed under [Apache License v2.0](http://www.apache.org/licenses/LICENSE-2.0). It is used in a hope that a newer version becomes MIT-licensed eventually [(as planned)](http://blog.getbootstrap.com/2013/10/29/bootstrap-3-0-1-released/) and replaces the current version.

* The directory `awesome` contains [Font Awesome](http://fortawesome.github.io/Font-Awesome/), licensed under [SIL OFL 1.1](http://scripts.sil.org/OFL).

* This product uses the JAM(mbp) API — Copyright 1993 Joaquim Homrighausen, Andrew Milner, Mats Birch, Mats Wallin. ALL RIGHTS RESERVED. (JAM may be used by any developer as long as [its specifications](https://github.com/Mithgol/node-fidonet-jam/blob/master/JAM.txt) are followed exactly. JAM may be used free-of-charge by any developer for any purpose, commercially or otherwise.)

* Node.js modules (installed in the `node_modules` directory) belong to their respective owners.