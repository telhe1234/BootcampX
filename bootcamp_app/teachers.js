const { Pool } = require('pg');
const { user, rows } = require('pg/lib/defaults');
// const args = process.argv.slice(2);
// console.log(args);
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`;
const cohortName = process.argv[2] || 'JUL02';
const values = [`${cohortName}`];
pool.query(queryString, values)
.then(res => {
  // console.log(res.rows);
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })

})
.catch(err => console.error('query error', err.stack));