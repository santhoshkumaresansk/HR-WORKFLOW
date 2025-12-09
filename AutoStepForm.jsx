import React, { useEffect, useState } from 'react'
import { useWorkflowStore } from '../../store/workflowStore.js'
import { getAutomations } from '../../api/mockApi.js'

export default function AutoStepForm() {
  const selectedNode = useWorkflowStore(s => s.selectedNode)
  const updateNodeData = useWorkflowStore(s => s.updateNodeData)
  const [automations, setAutomations] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: '',
    actionId: '',
    params: {},
  })

  useEffect(() => {
    getAutomations().then(list => {
      setAutomations(list)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!selectedNode) return
    setForm({
      title: selectedNode.data?.title || 'Automation',
      actionId: selectedNode.data?.actionId || '',
      params: selectedNode.data?.params || {},
    })
  }, [selectedNode])

  if (!selectedNode) return null

  const onChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const onParamChange = (key, value) => {
    setForm(prev => ({
      ...prev,
      params: {
        ...prev.params,
        [key]: value,
      },
    }))
  }

  const selectedAction = automations.find(a => a.id === form.actionId)

  const onSave = () => {
    updateNodeData(selectedNode.id, form)
  }

  return (
    <div className="form">
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          className="form-input"
          value={form.title}
          onChange={e => onChange('title', e.target.value)}
          placeholder="Send welcome email"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Action</label>
        {loading ? (
          <div className="helper-text">Loading actions...</div>
        ) : (
          <select
            className="form-select"
            value={form.actionId}
            onChange={e => onChange('actionId', e.target.value)}
          >
            <option value="">Select action</option>
            {automations.map(a => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        )}
      </div>
      {selectedAction && (
        <div className="form-group">
          <label className="form-label">Action parameters</label>
          {selectedAction.params.map(param => (
            <input
              key={param}
              className="form-input"
              placeholder={param}
              value={form.params[param] || ''}
              onChange={e => onParamChange(param, e.target.value)}
              style={{ marginBottom: '0.25rem' }}
            />
          ))}
        </div>
      )}
      <button className="btn" type="button" onClick={onSave}>
        Save Automated Step
      </button>
    </div>
  )
}
