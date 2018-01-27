// Find the duration between two dates
var breakfast = moment('17:26','HH:mm');
var lunch = moment();
console.log( moment.duration(lunch - breakfast).humanize() + ' between meals' ) // 4 hours between meals
var result = moment.duration(lunch - breakfast).seconds();

// var result2 = lunch.diff(breakfast,"seconds" );
var result2 = lunch.diff(breakfast,"minutes" );
var freque = 10

console.log(freque);


var result3 = Math.trunc(result2 / freque)

var result4 = result2 - (result3*freque)


console.log(result2);

console.log(result3);

console.log(result4);

var result5 = moment().add(result4, 'm');

console.log(result5);

console.log(moment(result5).format('HH:mm'));
