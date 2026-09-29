const STORAGE_KEY = 'incident_agent_data';

const initialData = [
  {
    id: "INC-204",
    service: "Payment Gateway",
    severity: "CRITICAL",
    status: "investigating",
    detected: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 mins ago
    duration: "12m",
    assigned: "AI Engine",
    description: "Payment API latency increased beyond 2000ms SLA, affecting checkout.",
    error: "Connection timeout while calling downstream banking API.",
    logs: "[14:32:08] ERROR Payment API\n[14:32:09] ERROR Database connection timeout\n[14:32:12] WARN Connection pool 94%\n[14:32:15] ERROR Request failed",
    environment: "Production"
  },
  {
    id: "INC-203",
    service: "Auth Service",
    severity: "HIGH",
    status: "mitigating",
    detected: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    duration: "45m",
    assigned: "Sarah Connor",
    description: "Intermittent token validation failures in EU region.",
    error: "JWT verification failed: invalid signature",
    logs: "[13:55:00] INFO Auth check started\n[13:55:01] ERROR JWT verification failed",
    environment: "Production"
  },
  {
    id: "INC-202",
    service: "Search Index",
    severity: "MEDIUM",
    status: "resolved",
    detected: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    duration: "1h 15m",
    assigned: "John Smith",
    description: "Search results delayed by 5 seconds.",
    error: "Elasticsearch node high CPU",
    logs: "[11:30:00] WARN Node 3 CPU 95%\n[12:45:00] INFO Node restarted",
    environment: "Staging"
  }
];

export const getIncidents = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

export const getIncidentById = (id) => {
  const incidents = getIncidents();
  return incidents.find(inc => inc.id === id);
};

export const createIncident = (incidentData) => {
  const incidents = getIncidents();
  const nextNum = incidents.length > 0 
    ? Math.max(...incidents.map(i => parseInt(i.id.replace('INC-', '')))) + 1 
    : 1;
  const newIncident = {
    id: `INC-${nextNum.toString().padStart(3, '0')}`,
    status: 'detected',
    detected: new Date().toISOString(),
    duration: '0m',
    assigned: 'Unassigned',
    ...incidentData
  };
  incidents.unshift(newIncident);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
  return newIncident;
};

export const updateIncidentStatus = (id, newStatus) => {
  const incidents = getIncidents();
  const index = incidents.findIndex(inc => inc.id === id);
  if (index !== -1) {
    incidents[index].status = newStatus;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
    return incidents[index];
  }
  return null;
};
