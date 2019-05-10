# Nest.js MVC

## Implementation Log

Prerequisites:

- Node.js environment
- `yarn` package manager

Install Nest CLI globally.

```bash
$ yarn global add @nestjs/cli
```

Scaffold your project. (In this repository the app name is `nestjs-mvc`.)

```bash
$ nest new nestjs-mvc
$ cd nestjs-mvc
```

Optional step: upgrade `package.json` dependencies to the latest.

```bash
$ yarn global add npm-check-updates
$ ncu -u
$ yarn
```

Optional step: update `format` script in `package.json`, so prettier will format all your project files.

```
    "format": "prettier --write '**/*.{ts,tsx,js,jsx,json,md,html}'",
```

Additionally you have to create a `./.prettierignore` file in your project root folder with the following content:

```
coverage
dist
package-lock.json
.cache
.idea
.vscode
```

It is a good practice to have also an `.editorconfig` file in your project's root folder with the following content. More about editorconfig: https://editorconfig.org/

```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

Now you can test your scaffolded project. Check `package.json`'s `scripts` section for available commands.

```bash
$ yarn build
$ yarn format
etc.
```

Before any git commit, you should run formatter, linting tool with fix, test and check coverage.

```bash
$ yarn format
$ yarn lint --fix
$ yarn test
$ yarn test:e2e
$ yarn test:cov
```

(Don't forget to create a git commit in this stage.)

Run your project in dev mode and open the app in your browser. (The default address is http://localhost:3000)

```bash
$ yarn start:dev
$ open http://localhost:3000
```

You should see the `Hello World!` message.
