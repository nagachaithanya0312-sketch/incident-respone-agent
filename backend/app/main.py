from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

from app.agents.incident_agent import IncidentAgent

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Incident Response Agent API")

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IncidentData(BaseModel):
    id: str
    service: str
    severity: str
    description: str
    error: Optional[str] = None
    logs: Optional[str] = None

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "API is running"}

@app.post("/api/analysis/incident")
def analyze_incident(data: IncidentData):
    agent = IncidentAgent()
    # Execute workflow synchronously for the demo API call.
    result = agent.run_analysis_workflow(data.dict())
    return result

# ... (Preserve existing endpoints from previous steps)
@app.get("/api/incidents")
def get_incidents():
    return []

@app.get("/api/incidents/{id}")
def get_incident(id: str):
    return {}

@app.get("/api/runbooks")
def get_runbooks():
    return []

@app.get("/api/postmortems")
def get_postmortems():
    return []
