import React from 'react'
import NodeSidebar from './components/sidebar/NodeSidebar.jsx'
import WorkflowCanvas from './components/canvas/WorkflowCanvas.jsx'
import NodeFormPanel from './components/panel/NodeFormPanel.jsx'
import WorkflowTester from './components/test/WorkflowTester.jsx'
import { useWorkflowStore } from './store/workflowStore.js'

export default function App() {
  const activeTab = useWorkflowStore(s => s.activeRightTab)
  const setActiveTab = useWorkflowStore(s => s.setActiveRightTab)

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-title">
          <div className="app-logo">HR</div>
          <div>
            <p className="app-name">Workflow Designer</p>
            <p className="app-subtitle">Onboarding • Leave • Approvals</p>
          </div>
        </div>
        <div>
          <button className="btn secondary" type="button">
            Export JSON
          </button>
        </div>
      </header>
      <div className="app-layout">
        <aside className="panel">
          <div className="panel-header">
            <span className="panel-title">Node Palette</span>
            <span className="badge-pill">Drag to canvas</span>
          </div>
          <NodeSidebar />
        </aside>
        <main className="canvas-wrapper">
          <WorkflowCanvas />
        </main>
        <aside className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="panel-header">
            <span className="panel-title">Inspector & Sandbox</span>
          </div>
          <div>
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'inspector' ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveTab('inspector')}
              >
                Node Inspector
              </button>
              <button
                className={`tab ${activeTab === 'tester' ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveTab('tester')}
              >
                Workflow Sandbox
              </button>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {activeTab === 'inspector' ? <NodeFormPanel /> : <WorkflowTester />}
          </div>
        </aside>
      </div>
    </div>
  )
}
