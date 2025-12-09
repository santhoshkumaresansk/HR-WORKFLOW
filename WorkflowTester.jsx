import React, { useState } from 'react'
import { useWorkflowStore } from '../../store/workflowStore.js'
import { validateWorkflow } from '../../utils/validation.js'
import { simulateWorkflow } from '../../api/mockApi.js'

export default function WorkflowTester() {
  const nodes = useWorkflowStore(s => s.nodes)
  const edges = useWorkflowStore(s => s.edges)
  const [issues, setIssues] = useState([])
  const [log, setLog] = useState([])
  const [running, setRunning] = useState(false)

  const runSimulation = async () => {
    const found = validateWorkflow(nodes, edges)
    setIssues(found)
    setLog([])

    if (found.some(i => i.level === 'error')) {
      return
    }

    setRunning(true)
    try {
      const result = await simulateWorkflow({ nodes, edges })
      setLog(result.steps || [])
    } finally {
      setRunning(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', height: '100%' }}>
      <p className="helper-text">
        The sandbox serializes the current workflow graph and passes it to a mock
        <code> /simulate </code>
        endpoint. Basic structure validation runs before simulation.
      </p>
      <button className="btn" type="button" onClick={runSimulation} disabled={running}>
        {running ? 'Running...' : 'Run Simulation'}
      </button>

      <div>
        <div className="form-label">Validation</div>
        {issues.length === 0 && <p className="helper-text">No validation issues.</p>}
        <ul className="log-list">
          {issues.map((issue, index) => (
            <li
              key={index}
              className={`log-item ${issue.level === 'error' ? 'log-error' : 'log-ok'}`}
            >
              {issue.level.toUpperCase()}: {issue.message}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="form-label">Execution log</div>
        {log.length === 0 && <p className="helper-text">Run the simulation to see a step log.</p>}
        <ul className="log-list">
          {log.map((line, index) => (
            <li key={index} className="log-item">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
