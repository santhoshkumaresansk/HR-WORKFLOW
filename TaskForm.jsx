import React, { useEffect, useState } from 'react'
import { useWorkflowStore } from '../../store/workflowStore.js'

export default function TaskForm() {
  const selectedNode = useWorkflowStore(s => s.selectedNode)
  const updateNodeData = useWorkflowStore(s => s.updateNodeData)
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
  })

  useEffect(() => {
    if (!selectedNode) return
    setForm({
      title: selectedNode.data?.title || 'Task',
      description: selectedNode.data?.description || '',
      assignee: selectedNode.data?.assignee || '',
      dueDate: selectedNode.data?.dueDate || '',
    })
  }, [selectedNode])

  if (!selectedNode) return null

  const onChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const onSave = () => {
    updateNodeData(selectedNode.id, form)
  }

  return (
    <div className="form">
      <div className="form-group">
        <label className="form-label">Task title</label>
        <input
          className="form-input"
          value={form.title}
          onChange={e => onChange('title', e.target.value)}
          placeholder="Collect documents"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-textarea"
          value={form.description}
          onChange={e => onChange('description', e.target.value)}
        />
      </div>
      <div className="form-row">
        <div className="form-row-item">
          <label className="form-label">Assignee</label>
          <input
            className="form-input"
            value={form.assignee}
            onChange={e => onChange('assignee', e.target.value)}
            placeholder="HR coordinator"
          />
        </div>
        <div className="form-row-item">
          <label className="form-label">Due date</label>
          <input
            type="date"
            className="form-input"
            value={form.dueDate}
            onChange={e => onChange('dueDate', e.target.value)}
          />
        </div>
      </div>
      <button className="btn" type="button" onClick={onSave}>
        Save Task Node
      </button>
    </div>
  )
}
