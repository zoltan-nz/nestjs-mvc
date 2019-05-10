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
