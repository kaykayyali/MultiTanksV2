import env from 'dotenv';
import {Primary_Service} from './src/server/index.mjs';
env.config();

const service = new Primary_Service();
service.start();