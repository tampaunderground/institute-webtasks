const Airtable = require('airtable@0.5.4');
const INSTITUTE_BASE = 'app7KNCPa79WHnceI';
/**
* @param context {WebtaskContext}
*/
module.exports = function(context, done) {
  var base = new Airtable({apiKey: context.secrets.AIRTABLE_API_KEY}).base(INSTITUTE_BASE);

  base('Courses').select({
      fields: [
        'id',
        'Enrollments Needed',
      ],
  }).all()
    .then(recs => {
      let courses = recs.map(c => {
        console.log(c);
        return {
          'id': c.get('id'),
          'needed': c.get('Enrollments Needed'),
        };
      });
      done(null, courses);
    })
    .catch(e => {
      done("Error fetching courses from Airtable: " + e.message, null);
    });
};
