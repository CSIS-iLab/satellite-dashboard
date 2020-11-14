[![CC BY-SA 4.0](https://img.shields.io/badge/license-cc%20by--sa%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-sa/4.0/)

# satellite-dashboard

> The Satellite Dashboard is a joint project between the CSIS Aerospace Security Program, Secure World Foundation, and University of Texas Austin. It tracks the locations of objects in orbit in GEO and provides analysis on key events.

## Table of Contents

- [Quick-Start Instructions](#quick-start-instructions)
- [Usage](#usage)
  - [Local Development](#local-development)
  - [Build for Production](#build-for-production)
  - [Generate Static Project](#generate-static-project)
  - [See More Commands](#see-more-commands)
  - [Nuxt](#nuxt)
- [Data & API](#data-api)
- [Contributing](#contributing)
  - [Branching](#branching)
  - [Commit Messages](#commit-messages)
  - [Naming Conventions](#naming-conventions)
  - [Recommended Extensions](#recommended-extensions)

## Quick-start Instructions

```bash
# Clone repository
$ git clone git@github.com:CSIS-iLab/satellite-dashboard.git

# Navigate to project
$ cd satellite-dashboard

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm dev
```

## Usage

### Local Development

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting, etc.

```bash
$ npm dev
```

### Build for Production

```bash
$ npm build

# Optionally start server to view built site.
$ npm start
```

### Generate static project

```bash
$ npm generate
```

### See More Commands

This will display all available commands, such as running eslint or stylelint independently.

```shell
$ npm run
```

### Nuxt

This project is built using Nuxt.js. For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Data & API

Data for this project is provided by UT Austin's [AstriaGraph](http://astria.tacc.utexas.edu/AstriaGraph/) API.

A cron script pulls in data to the WordPress site database daily and are pulled into the Nuxt site's store via the WordPress REST API.

### Analysis

Returns Analysis post content and associated metadata (tags, categories, authors, etc.).

- Endpoint: `/wp-json/wp/v2/posts`
- Accessible via `store/analysis.js`

### Satellites

Returns satellite objects orbital data and metadata, including any meta values overridden by the program via the WordPress dashboard.

- Endpoint: `/wp-json/satdash/v1/satellites`
- Accessible via `store/satellites.js`

Each responses contains an array of objects with the properties listed below.

<details>
  <summary>Click to view properties.</summary>
  
  #### Example Data
  ```json
    {
      "id":"10000_2020-11-03T09:05:16.000000Z",
      "catalog_id":"10000",
      "source1":{
          "CatalogId":"10002",
          "Name":"TITAN 3C TRANSTAGE R\/B",
          "NoradId":"10002",
          "OrbitType":"GEO",
          "countryOfLaunch":"US",
          "source1LastCatalogUpdate":"2020-11-14T09:05:16.000000Z",
          "Source1Name":null
      },
      "source2":{
          "Type":"",
          "Status":"",
          "Purpose":"",
          "Lifetime":"",
          "Operator":"",
          "Contractor":"",
          "LaunchSite":"",
          "source2Name":"UCS",
          "LaunchVehicle":"",
          "source2UniqueId":7,
          "countryOfJurisdiction":"",
          "source2LastCatalogUpdate":"2020-05-20T15:44:00.000000Z"
      },
      "orbital":{
          "ArgP":0.87797688487499825,
          "Ecc":0.029299349237009727,
          "Epoch":"2020-11-13T22:17:34.000000Z",
          "Inc":0.23444950870574993,
          "MeanAnom":5.2347829487779922,
          "RAAN":5.5017097220786413,
          "SMA":43542224.427652501
      }
    },
  ```

  #### Fields & Types

  | field name               | type   | description                                                                                                                                      |
  | ------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
  | source1UniqueId          | int    | AG data source unique identifier of source 1                                                                                                     |
  | source1Name              | string | Name of source 1                                                                                                                                 |
  | source1LastCatalogUpdate | string | Datetime that the data from source 1 was last updated                                                                                            |
  | CatalogId                | string | Unique ID of the space object                                                                                                                    |
  | Name                     | string | Name of the object                                                                                                                               |
  | NoradId                  | string | ID of the object assigned by the USAF                                                                                                            |
  | LaunchDate               | string | Datetime of the launch of the spaceobject                                                                                                        |
  | countryOfLaunch          | string | Name of country that launched the object                                                                                                         |
  | ArgP                     | float  | Variable describing the periapsis of the object’s orbit with an angle around the orbit from the equatorial plane; one of the parameters in a TLE |
  | Ecc                      | float  | Variable describing the shape of the object’s orbit; one of the parameters in a TLE                                                              |
  | Inc                      | float  | Variable describing the orientation of the object’s orbit relative to the equatorial plane of the earth; one of the parameters in a TLE          |
  | MeanAnom                 | float  | Variable describing the position of the object in its orbit; the “fast variable;” one of the parameters in a TLE                                 |
  | SMA                      | float  | Variable describing the size of the object’s orbit; one of the parameters in a TLE                                                               |
  | RAAN                     | float  | Variable describing the periapsis of the object’s orbit with a vector in the equatorial plane; one of the parameters in a TLE                    |
  | Epoch                    | string | Time corresponding to the orbit described by a TLE; one of the parameters in a TLE                                                               |
  | OrbitType                | string | Describes the regime of the orbit (just “GEO” for phase 1)                                                                                       |
  | source2UniqueId          | int    | AG data source unique identifier of source 2                                                                                                     |
  | source2Name              | string | Name of source 2                                                                                                                                 |
  | source2LastCatalogUpdate | string | Datetime that the data from source 2 was last updated                                                                                            |
  | LaunchSite               | string | Location from which the space object was launched                                                                                                |
  | LaunchVehicle            | string | Vehicle on which the space object was launched                                                                                                   |
  | countryOfJurisdiction    | string | Country that has legal power over the space object                                                                                               |
  | Contractor               | string | Entity contracted to work on space object’s mission                                                                                              |
  | Operator                 | string | Entity that manages the space object’s mission                                                                                                   |
  | Type                     | string | General type of the space object                                                                                                                 |
  | Purpose                  | string | Specified purpose of the space object’s mission                                                                                                  |
  | Status                   | string | Status of space object                                                                                                                           |
  | Lifetime                 | string | Expected lifetime of space object                                                                                                                |

</details>



## Contributing

### Branching

When modifying the code base, always make a new branch. Unless it's necessary to do otherwise, all branches should be created off of `master`.

Branches should use the following naming conventions:

| Branch type               | Name                                                      | Example                  |
| ------------------------- | --------------------------------------------------------- | ------------------------ |
| New Feature               | `feat/<short description of feature>`                     | `feat/header-navigation` |
| Bug Fixes                 | `bug/<short description of bug>`                          | `bug/mobile-navigation`  |
| Documentation             | `docs/<short description of documentation being updated>` | `docs/readme`            |
| Code clean-up/refactoring | `refactor/<short description>`                            | `refactor/apply-linting` |
| Content Updates           | `content/<short description of content>`                  | `content/add-new-posts`  |

When ready to merge, submit a Pull Request into `master`. All code will be reviewed by the lead developer on the project before being merged into `master`.

### Commit Messages

Write clear and concise commit messages describing the changes you are making and why. If there are any issues associated with the commit, include the issue # in the commit title.

### Naming Conventions

- This project uses the [BEM](http://getbem.com/introduction/) naming convention.
- This project uses [Stylelint](https://stylelint.io) to maintain a consistent code style. Errors are flagged in the console during development and can be automatically fixed by running `yarn run lint:styles-fix`.

### Recommended Extensions

It is recommended to use the following extensions when working on this project to assist with code formatting:

- [Veuter](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Copyright / License Info

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0
International License](http://creativecommons.org/licenses/by-sa/4.0/).

[![CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)
