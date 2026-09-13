import {DocumentBuilder} from "@nestjs/swagger";

const swaggerConfig = new DocumentBuilder()
  .setTitle("Job Seeker API")
  .setDescription('Job Seeker API')
  .setVersion('1.0')
  .build();


export default  swaggerConfig;
