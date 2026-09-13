import 'dotenv/config';
import { TypeOrmModule} from '@nestjs/typeorm';


export default TypeOrmModule.forRoot({
  type: 'mssql',
  host: process.env.DATABASE_SERVER,
  port: +process.env.DATABASE_PORT!,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [],
});