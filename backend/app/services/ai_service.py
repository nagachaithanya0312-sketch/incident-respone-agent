import os
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

# Mock Memory Data
HISTORICAL_MEMORY = [
    {
        "id": "INC-101",
        "service": "Payment Gateway",
        "symptoms": "HTTP 500 responses and Database timeouts during checkout.",
        "root_cause": "Database connection pool exhaustion due to slow queries.",
        "resolution": "Restarted payment service and increased connection pool.",
        "runbook": "DB-RECOVERY-01"
    }
]

class AIService:
    def __init__(self):
        # Load API keys from env, not hardcoded.
        self.api_key = os.environ.get("OPENAI_API_KEY") or os.environ.get("ANTHROPIC_API_KEY")
        self.provider = "mock" if not self.api_key else "llm"

    def analyze_incident(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        In production, this routes to an LLM provider.
        For now, if no API key is present, we return deterministic fallback analysis.
        """
        if self.provider == "llm":
            # Simulate real LLM call
            return self._call_llm(incident_data)
        else:
            return self._deterministic_fallback_analysis(incident_data)

    def _call_llm(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        # Placeholder for real API call (OpenAI/Anthropic)
        pass

    def _deterministic_fallback_analysis(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        service = incident_data.get("service", "Unknown Service").lower()
        error = incident_data.get("error", "").lower()

        # Simple mock logic based on the incident contents
        if "payment" in service or "database timeout" in error:
            return {
                "understanding": "The system is experiencing severe latency or timeouts, likely related to backend data store connectivity.",
                "similar_incidents": ["INC-101"],
                "possible_root_cause": "Database connection pool exhaustion.",
                "evidence": [
                    "Database timeout errors observed in logs.",
                    "Connection pool utilization is historically linked to this pattern.",
                    "High similarity (92%) to historical incident INC-101."
                ],
                "recommended_runbook": "DB-RECOVERY-01",
                "confidence": "High (85%)",
                "explanation": "Evidence strongly suggests that the connection pool has been exhausted due to sudden load or slow queries locking resources. The AI assessment points to similar past events (INC-101) where the same service experienced identical symptoms."
            }
        else:
            # Generic fallback
            return {
                "understanding": f"Anomalies detected in the {incident_data.get('service', 'Service')}.",
                "similar_incidents": [],
                "possible_root_cause": "Unknown application error or configuration drift.",
                "evidence": [
                    f"Errors observed: {incident_data.get('error', 'None')}",
                    "No exact historical matches found."
                ],
                "recommended_runbook": "GENERIC-TRIAGE-01",
                "confidence": "Low (40%)",
                "explanation": "The AI assessment cannot pinpoint an exact historical match. Evidence suggests a potential application-level bug or configuration issue. A generic triage runbook is recommended for preliminary diagnosis."
            }
