import env from 'dotenv';
import {Primary_Service} from './src/server/server.mjs';
env.config();

const service = new Primary_Service();
service.start();