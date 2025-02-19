// automated test doingggg

import {formatCurrency} from '../scripts/utils/money.js';

console.log('test suite:format currency');

// in case on manuala testing it is very hard to do it for all the test cases
// here 3 different cases these are 3 diff test cases
console.log('convert cents into dollars')
if(formatCurrency(2095) === '20.95'){
      console.log('case1 test passed')
}else{
    console.log('test failed');
}
// basic test cases
console.log('works with 0')
if(formatCurrency(0)==='0.00'){
    console.log('case 2 string passed')
}
else{
    console.log('string failed');
}
// edge case

console.log('rounds up to the nearest cent')
if(formatCurrency(2000.5)==='20.01'){
    console.log(' case3 test passed')
}else{
    console.log('case3 failed')
}
// edge case
if(formatCurrency(2000.4)==='20.00'){
    console.log('case4 test passed');
}
else{
    console.log('test case 4 failed')
}


// create suits ---create tests---compare values and display result
// Jasmine testing framework