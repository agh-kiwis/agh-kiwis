import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app/app.module";
import connection from "./connection";

// WIP
export const setupAsyncTests = () => {

  let app: INestApplication | any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      // Inject new dataSource there
      
    })
    .compile();

    app = moduleFixture.createNestApplication();



    // await connection.clear(app);
    await app.init();

    // We need to override the default connection
    // because we need to use the same connection
    // for all tests
    

  });

  // beforeEach(async () => {
  //   // await connection.clear(app);
  // });

  afterAll(async () => {
    await connection.close(app);
    await app.close();
  });

  // beforeAll(() => console.log('beforeAll'));
  // afterAll(() => shared - after - all - code);
  // beforeEach(() => shared - before - each - code);
  // afterEach(() => shared - after - each - code);
};