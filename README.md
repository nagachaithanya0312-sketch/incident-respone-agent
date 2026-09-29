# AI Incident Response Agent (Nexus AI)

## 📖 Project Overview
The AI Incident Response Agent (codename Nexus AI) is a next-generation, premium enterprise operations platform. It assists DevOps and SRE teams in detecting, diagnosing, mitigating, and documenting production incidents. By leveraging a simulated AI workflow, it reduces MTTR (Mean Time to Resolution) and automates repetitive tasks like memory search, runbook recommendation, and post-mortem generation.

## 🏗️ Architecture
- **Frontend SPA**: A single-page application built with React and Vite. Uses client-side routing via React Router.
- **Service Layer**: Abstraction layers (`incidentService.js`, `incidentMemoryService.js`, `postMortemService.js`) currently mock backend interactions and use `localStorage` for data persistence during demonstrations.
- **Backend (Optional/Stubbed)**: A FastAPI backend structure is provided but the current demonstration is purely client-side to ensure zero-setup hackathon presentations.

## ✨ Features
- **Real-time Command Center**: Live telemetry and terminal-style event feeds.
- **AI-Assisted Resolution**: Simulates validating incidents, searching memory, diagnosing root causes, and executing runbooks.
- **Safe Simulation Mode**: A controlled environment to execute runbooks without destructive commands, requiring human approval.
- **Incident Memory**: Semantic-style search against past incidents and their resolutions to reuse knowledge.
- **Automated Post-Mortems**: Generates comprehensive incident reports and extracts lessons learned.
- **Advanced Analytics**: Visualizes system health, incident trends, runbook success rates, and AI impact using Recharts.
- **Premium UI/UX**: Glassmorphism design, ambient animations, glowing status indicators, and a responsive layout designed for operations centers.
- **Hackathon Demo Mode**: A single-click feature to generate a realistic incident and walk through the entire platform capabilities.

## 🛠️ Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3, Vanilla CSS (Custom Keyframes)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM
- **Backend Framework**: Python / FastAPI (Stubbed)

## ⚙️ Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Environment Variables
Currently, the application runs entirely locally using mocked data and `localStorage`. No external API keys or environment variables are required for the frontend demonstration.

## 🚀 How to Run the Application

### 1. Start the Frontend (Primary Demo)
The frontend contains the complete mock services and UI for the demo. It runs on `localhost:5173`.

```bash
cd frontend
npm install
npm run dev
```

### 2. Start the Backend (Optional)
The backend is currently a stub for future API integration. It runs on `localhost:8000`.

```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🎮 Demo Workflow
To demonstrate the platform end-to-end:
1. Start the frontend and open `http://localhost:5173`.
2. Click the **"🚀 Launch Demo Incident"** button on the Dashboard.
3. You will be routed to a newly created critical incident (Payment API Database Connection Timeout).
4. Review the logs and AI analysis, then click **"Start AI-Assisted Resolution"**.
5. Watch the AI validate the incident and recommend Runbook `DB-RECOVERY-01`.
6. Click **"Approve"** to run the Safe Simulation Mode.
7. Upon successful simulation, click **"Generate Post-Mortem"**.
8. Review the generated document and click **"Save Post-Mortem & Update Memory"**.
9. Navigate to **Incident Memory** in the sidebar to search for and verify the newly learned incident.
10. Navigate to **Analytics** to see the dynamically updated KPIs reflecting the new incident.

## ⚠️ Safety Limitations
- **Simulation Only**: The current agent does NOT execute real destructive bash scripts or database queries. All runbook executions are safely simulated.
- **Mocked AI**: The "AI Diagnosis" relies on hardcoded heuristics for the hackathon demo. It does not send proprietary logs to an external LLM.

## 🔮 Future Improvements
- **LLM Integration**: Connect the analysis engine to an actual LLM (e.g., OpenAI/Gemini) for dynamic log parsing.
- **Vector Database**: Replace local array filtering with Pinecone or Weaviate for true semantic memory search.
- **Kubernetes Agent**: Deploy a read-only sidecar to pull live cluster metrics instead of mock data.
