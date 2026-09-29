const STORAGE_KEY = 'incident_post_mortems';

const initialPostMortems = [
  {
    id: 'PM-101',
    incidentId: 'INC-101',
    createdDate: '2026-08-12',
    impact: 'Customer checkout was unavailable for 45 minutes.',
    rootCause: 'Database connection pool exhaustion due to slow queries.',
    resolution: 'Restarted payment service and increased connection pool from 50 to 200.',
    lessonsLearned: 'Need better monitoring on query latency and automated pool scaling.'
  },
  {
    id: 'PM-095',
    incidentId: 'INC-095',
    createdDate: '2026-07-28',
    impact: '1500 users were logged out and unable to log in for 22 minutes.',
    rootCause: 'Redis cache eviction policy deleted active session tokens.',
    resolution: 'Changed Redis eviction policy to volatile-lru and increased instance memory.',
    lessonsLearned: 'Session tokens should be persisted in DB, not just cache.'
  }
];

export const getPostMortems = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPostMortems));
    return initialPostMortems;
  }
  return JSON.parse(data);
};

export const savePostMortem = (pmData) => {
  const postMortems = getPostMortems();
  const nextNum = postMortems.length > 0 
    ? Math.max(...postMortems.map(p => parseInt(p.id.replace('PM-', '')))) + 1 
    : 100;
  
  const newPM = {
    id: `PM-${nextNum}`,
    createdDate: new Date().toISOString().split('T')[0],
    ...pmData
  };
  
  postMortems.unshift(newPM);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(postMortems));
  return newPM;
};
