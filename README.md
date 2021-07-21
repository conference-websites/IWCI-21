#  CoNEXT 2021 Interdisciplinary Workshop on (de)Centralization in the Internet (IWCI) Web Site

This repository is based on
[https://github.com/conference-websites/ACM-ICN2020](https://github.com/conference-websites/ACM-ICN2020).

## License

Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License (see LICENSE.md for details).

## Generating site using jekyll

The website uses jekyll engine to generate the website using the templates.  To get started with jekyll:

    gem install jekyll bundler
    bundle install
    bundle exec jekyll build

To generate the website and serve it from a local webserver, e.g., for debugging

    bundle exec jekyll serve

## Overview

The repository is organized as follows:

* `_config.yml` is a configuration file for the website, defining title, menu, and several basic parameters
* `_data/`      contains datasets in YaML or JSON format defining conference dates, news, and supporters
* `_includes/`  are supplementary scripts to generate website's content, including templates for menu, news, google analytics, and sponsors
* `_layouts/`   are layout files

* `css/`        CSS code. Only edit style.css, the rest is 3rd party.
* `css/images/` jquerymobile CSS images
* `images/`     Our images (logos, etc.)
* `js/`         Javascript. Only edit script.js, the rest is 3rd party libraries.
* `misc/`       Static documents served by the site: the calls for papers, PDF of the conference schedule, etc.
* `*.md`, `*.html` Individual pages in markdown or HTML format.

The site uses a bunch of 3rd party javascript libraries. You will want to use their latest versions:

* http://jquery.com/ - the javascript goes into `js`
* http://jquerymobile.com/ - the javascript goes into `js` and the CSS and images go into `css`
* http://jquerymobile.com/demos/1.1.0/docs/_assets/css/jqm-docs.css - the CSS for the jquerymobile documentation page, goes into CSS
* http://code.google.com/p/css3-mediaqueries-js/ - the javascript goes into `js`

## Getting started as ACM conference web chair

To get started, first check out:

http://www.sigcomm.org/conference-planning/web-chairs .

You'll have to request an account at:

http://campus.acm.org/public/infodir/account_request.cfm

For questions or to check on status of your request, you may try following up with ishelpdesk@hq.acm.org.

You should receive further instructions from ACM on how to upload content to the server when your account is setup.
