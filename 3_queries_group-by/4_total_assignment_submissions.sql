SELECT cohorts.name AS cohort, count(assignment_submissions.*) AS total_submissions
FROM assignment_submissions
JOIN students ON student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
GROUP BY cohort
ORDER BY total_submissions DESC;