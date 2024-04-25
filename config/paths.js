'use strict';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default  {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build'),
};