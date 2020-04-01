[![CC BY-SA 4.0](https://img.shields.io/badge/license-cc%20by--sa%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-sa/4.0/)


# satellite-dashboard

> The Satellite Dashboard is a joint project between the CSIS Aerospace Security Program, Secure World Foundation, and University of Texas Austin. It tracks the locations of objects in orbit in GEO and provides analysis on key events.

## Table of Contents

- [Quick-Start Instructions](#quick-start-instructions)
- [Usage](#usage)
  - [Local Development](#local-development)
  - [Build for Production](#build-for-production)
  - [See More Commands](#see-more-commands)
  - [Nuxt](#nuxt)

## Quick-start Instructions

```bash
# Clone repository
$ git clone git@github.com:CSIS-iLab/satellite-dashboard.git

# Navigate to project
$ cd satellite-dashboard

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

## Usage

### Local Development

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting, etc.

```bash
$ yarn dev
```

#### Build for production and launch server

```bash
$ yarn build
$ yarn start
```

### Generate static project

```bash
$ yarn generate
```

### See More Commands

This will display all available commands, such as running eslint or stylelint independently.

```shell
$ yarn run
```

### Nuxt

This project is built using Nuxt.js. For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Contributing

### Branching

When modifying the code base, always make a new branch. Unless it's necessary to do otherwise, all branches should be created off of `master`.

Branches should use the following naming conventions:

| Branch type               | Name                                                      | Example                     |
| ------------------------- | --------------------------------------------------------- | --------------------------- |
| New Feature               | `feature/<short description of feature>`                  | `feature/header-navigation` |
| Bug Fixes                 | `bug/<short description of bug>`                          | `bug/mobile-navigation`     |
| Documentation             | `docs/<short description of documentation being updated>` | `docs/readme`               |
| Code clean-up/refactoring | `refactor/<short description>`                            | `refactor/apply-linting`    |
| Content Updates           | `content/<short description of content>`                  | `content/add-new-posts`     |

When ready to merge, submit a Pull Request into `master`. All code will be reviewed by the lead developer on the project before being merged into `master`.

### Commit Messages

Write clear and concise commit messages describing the changes you are making and why. If there are any issues associated with the commit, include the issue # in the commit title.

### CSS Styles

- This project uses the [BEM](http://getbem.com/introduction/) naming convention.
- This project uses [Stylelint](https://stylelint.io) to maintain a consistent code style. Errors are flagged in the console during development and can be automatically fixed by running `yarn run lint:styles-fix`.

## Copyright / License Info

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0
International License][http://creativecommons.org/licenses/by-sa/4.0/].

[![CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)
