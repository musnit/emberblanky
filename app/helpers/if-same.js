import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value1, value2, output) {
  if(value1 === value2){
    return output;
  }
  else{
    return "";
  }
});
