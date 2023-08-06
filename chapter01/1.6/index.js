import statement from './statements.js';

import invoices from '../mocks/invoices.json' assert { type: 'json' };
import plays from '../mocks/plays.json' assert { type: 'json' };

const result = statement(invoices[0], plays);

console.log(result);
