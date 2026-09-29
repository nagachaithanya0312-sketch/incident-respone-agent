const STORAGE_KEY = 'incident_memory_data';

const defaultHistoricalIncidents = [
  {
    id: "INC-101",
    service: "Payment API",
    severity: "CRITICAL",
    date: "2026-08-12",
    resolutionStatus: "Resolved",
    problem: "HTTP 500 responses and Database timeouts during checkout.",
    rootCause: "Database connection pool exhaustion due to slow queries.",
    resolution: "Restarted payment service and increased connection pool from 50 to 200.",
    runbook: "DB-RECOVERY-01",
    resolutionTime: "45m"
  },
  {
    id: "INC-095",
    service: "Auth Service",
    severity: "HIGH",
    date: "2026-07-28",
    resolutionStatus: "Resolved",
    problem: "Users unable to login, receiving 401 Unauthorized.",
    rootCause: "Redis cache eviction policy deleted active session tokens.",
    resolution: "Changed Redis eviction policy to volatile-lru and increased instance memory.",
    runbook: "AUTH-CACHE-02",
    resolutionTime: "22m"
  },
  {
    id: "INC-088",
    service: "Search Index",
    severity: "MEDIUM",
    date: "2026-07-15",
    resolutionStatus: "Resolved",
    problem: "Search results delayed by 5-10 seconds.",
    rootCause: "Elasticsearch cluster yellow state due to unassigned shards.",
    resolution: "Forced shard reallocation and scaled up data nodes.",
    runbook: "ES-SCALE-05",
    resolutionTime: "1h 10m"
  },
  {
    id: "INC-082",
    service: "Notification Service",
    severity: "LOW",
    date: "2026-07-02",
    resolutionStatus: "Closed",
    problem: "Emails delayed by up to 30 minutes.",
    rootCause: "Third-party email provider rate limiting.",
    resolution: "Implemented exponential backoff and batching for email dispatch.",
    runbook: "NOTIF-RETRY-01",
    resolutionTime: "2h 5m"
  }
];

export const getIncidentMemory = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultHistoricalIncidents));
    return defaultHistoricalIncidents;
  }
  return JSON.parse(data);
};

export const addToIncidentMemory = (incidentData) => {
  const memory = getIncidentMemory();
  memory.unshift(incidentData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  return incidentData;
};

export const searchIncidentMemory = async (query, filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = getIncidentMemory();

      if (filters.service && filters.service !== 'All') {
        results = results.filter(inc => inc.service === filters.service);
      }
      if (filters.severity && filters.severity !== 'All') {
        results = results.filter(inc => inc.severity === filters.severity);
      }
      if (filters.resolutionStatus && filters.resolutionStatus !== 'All') {
        results = results.filter(inc => inc.resolutionStatus === filters.resolutionStatus);
      }
      if (filters.date && filters.date !== 'All Time') {
        const threshold = new Date();
        if (filters.date === 'Last 30 Days') threshold.setDate(threshold.getDate() - 30);
        if (filters.date === 'Last 90 Days') threshold.setDate(threshold.getDate() - 90);
        
        results = results.filter(inc => new Date(inc.date) >= threshold);
      }

      if (query.trim().length > 0) {
        const q = query.toLowerCase();
        results = results.map(inc => {
          let score = 0.3;
          const textToSearch = `${inc.problem} ${inc.rootCause} ${inc.service} ${inc.resolution} ${inc.id}`.toLowerCase();
          
          const queryWords = q.split(' ');
          queryWords.forEach(word => {
            if (word.length > 2 && textToSearch.includes(word)) {
              score += 0.2;
            }
          });

          score += (Math.random() * 0.1); 
          score = Math.min(score, 0.99);

          return { ...inc, similarity: score };
        });

        results = results.filter(inc => inc.similarity > 0.4);
        results.sort((a, b) => b.similarity - a.similarity);
      } else {
        results = results.map(inc => ({ ...inc, similarity: 1.0 }));
        results.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      resolve(results);
    }, 1200);
  });
};
