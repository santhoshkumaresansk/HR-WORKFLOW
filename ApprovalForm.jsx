import React, { useEffect, useState } from 'react'
import { useWorkflowStore } from '../../store/workflowStore.js'

const ROLES = ['Manager', 'HRBP', 'Director', 'Finance']

export default function ApprovalForm() {
  const selectedNode = useWorkflowStore(s => s.selectedNode)
  const updateNodeData = useWorkflowStore(s => s.updateNodeData)
  const [form, setForm] = useState({
    title: '',
    approverRole: 'Manager',
    autoApproveThreshold: 0,
  })

  useEffect(() => {
    if (!selectedNode) return
    setForm({
      title: selectedNode.data?.title || 'Approval',
      approverRole: selectedNode.data?.approverRole || 'Manager',
      autoApproveThreshold: selectedNode.data?.autoApproveThreshold ?? 0,
    })
  }, [selectedNode])

  if (!selectedNode) return null

  const onChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const onSave = () => {
    updateNodeData(selectedNode.id, {
      ...form,
      autoApproveThreshold: Number(form.autoApproveThreshold) || 0,
    })
  }

  return (
    <div className="form">
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          className="form-input"
          value={form.title}
          onChange={e => onChange('title', e.target.value)}
          placeholder="Manager approval"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Approver role</label>
        <select
          className="form-select"
          value={form.approverRole}
          onChange={e => onChange('approverRole', e.target.value)}
        >
          {ROLES.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Auto-approve threshold</label>
        <input
          type="number"
          className="form-input"
          value={form.autoApproveThreshold}
          onChange={e => onChange('autoApproveThreshold', e.target.value)}
        />
      </div>
      <button className="btn" type="button" onClick={onSave}>
        Save Approval Node
      </button>
    </div>
  )
}
