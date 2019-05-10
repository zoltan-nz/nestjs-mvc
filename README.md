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

Let's update our homepage to render a Handlebar template. We partially follow the instructions from this page, please read it for more details: https://docs.nestjs.com/techniques/mvc

```bash
$ yarn add hbs @types/hbs
```

Update `./src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import hbs = require('hbs');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  await app.listen(3000);
}

bootstrap();
```

Create two new folders in the project root:

```bash
$ mkdir public views
```

Create a custom `stylesheets` folder in `./public` and add `custom.css`. You can place here your custom styles.

```bash
$ mkdir ./public/stylesheets
$ touch ./public/stylesheets/custom.css
```

Create a few handlebar files in `views` folder.

```
$ touch ./views/about.hbs
$ touch ./views/home.hbs
$ touch ./views/layout.hbs
```

Create `./views/partials` subfolder and add a `navbar` partial.

```bash
$ mkdir ./views/partials
$ touch ./views/partials/navbar.hbs
```

Add content to your templates.

`./views/partials/navbar.hbs`

```handlebars
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Nestjs MVC</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/about">About</a>
      </li>
    </ul>
  </div>
</nav>
```

`./views/about.hbs` and `./views/home.hbs`

```handlebars
<h1>{{title}}</h1>
<p>Welcome to {{title}}</p>
```

`./views/layout.hbs`

```handlebars
<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="/stylesheets/custom.css">

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
          integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
          crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
          integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
          crossorigin="anonymous"></script>

</head>
<body>
<div class="container">
  {{>navbar}}
  <div class="row">
    <div class="col">
      {{{body}}}
    </div>
  </div>
</div>
</body>
</html>
```

Update `./src/app.controller.ts`.

```typescript
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  root() {
    return { title: 'Home Page' };
  }

  @Get('/about')
  @Render('about')
  about() {
    return { title: 'About Page' };
  }
}
```

You can update `nodemon` configuration files to watch handlebar files and the `views` folder.

`./nodemon.json`

```json
{
  "watch": ["dist", "views"],
  "ext": "js,hbs",
  "exec": "node dist/main"
}
```

`./nodemon-debug.json`

```json
{
  "watch": ["src", "views"],
  "ext": "ts,hbs",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "node --inspect-brk -r ts-node/register -r tsconfig-paths/register src/main.ts"
}
```

You can run your application with `yarn start:dev` and refresh your page in the browser. (http://localhost:3000)

Update tests.

`./src/app.controller.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('renders root', () => {
    expect(appController.root()).toStrictEqual({ title: 'Home Page' });
  });

  it('renders /about', () => {
    expect(appController.about()).toStrictEqual({ title: 'About Page' });
  });
});
```

`./test/app.e2e-spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { join } from 'path';
import hbs = require('hbs');

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });

  it('/about (GET)', () => {
    return request(app.getHttpServer())
      .get('/about')
      .expect(200);
  });
});
```
