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
