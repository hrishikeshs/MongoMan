Ember.Handlebars.registerBoundHelper('humanize', function (number) {
  var numDigits = (number + "").length;
  switch(numDigits) {

    case 3:              return number + " bytes";
    case 4:
    case 5:
    case 6:
                         return Math.floor(Math.round(number/Math.pow(2,10))) + " Kb";

    case 7:              return Math.floor(Math.round(number/Math.pow(2,20))) + " Mb";

    default:             return Math.floor(Math.round(number/Math.pow(2,30))) + " Gb";
  }
});
