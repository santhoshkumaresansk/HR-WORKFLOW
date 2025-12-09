import React, { useEffect, useState } from 'react'
import { useWorkflowStore } from '../../store/workflowStore.js'

export default function EndForm() {
  const selectedNode = useWorkflowStore(s => s.selectedNode)
  const updateNodeData = useWorkflowStore(s => s.updateNodeData)
  const [endMessage, setEndMessage] = useState('')
  const [summary, setSummary] = useState(true)

  useEffect(() => {
    if (!selectedNode) return
    setEndMessage(selectedNode.data?.endMessage || 'Workflow completed')
    setSummary(Boolean(selectedNode.data?.summary))
  }, [selectedNode])

  if (!selectedNode) return null

  const onSave = () => {
    updateNodeData(selectedNode.id, {
      endMessage,
      summary,
    })
  }

  return (
    <div className="form">
      <div className="form-group">
        <label className="form-label">End message</label>
        <input
          className="form-input"
          value={endMessage}
          onChange={e => setEndMessage(e.target.value)}
          placeholder="Onboarding completed"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Summary flag</label>
        <div className="checkbox-row">
          <input
            id="summary-flag"
            type="checkbox"
            checked={summary}
            onChange={e => setSummary(e.target.checked)}
          />
          <label htmlFor="summary-flag">Generate summary at this step</label>
        </div>
      </div>
      <button className="btn" type="button" onClick={onSave}>
        Save End Node
      </button>
    </div>
  )
}
