const moment = require('moment')

module.exports = {
    formatDate: function(date, format){
       const now =  new Date();
       var diff = moment.duration(moment(now).diff(moment(date)));
       var days = parseInt(diff.asDays()); 
        var minutes = parseInt(diff.asMinutes());



console.log(minutes)
if(minutes > 1)
{
        return moment(date).format(format);
}
        return 'Just now'
      },
    
      ifcond:function(v1, v2, options) {
        if(v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      }
    }