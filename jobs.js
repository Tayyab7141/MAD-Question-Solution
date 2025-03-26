const express = require('express');
const router = express.Router();

const jobs = [
  { _id: '1', title: 'Frontend Developer', company: 'Tech Co.', location: 'Remote' },
  { _id: '2', title: 'Backend Developer', company: 'Dev Solutions', location: 'On-site' },
  { _id: '3', title: 'Full Stack Developer', company: 'Code Inc.', location: 'Hybrid' },
  { _id: '4', title: 'React Native Developer', company: 'AppTech', location: 'Remote' },
  { _id: '5', title: 'UI/UX Designer', company: 'DesignPro', location: 'On-site' },
];

router.get('/jobs', (req, res) => {
  res.status(200).json(jobs);
});

module.exports = router;
