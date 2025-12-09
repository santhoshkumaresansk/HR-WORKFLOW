import React, { useEffect, useState } from 'react'
import { useWorkflowStore } from '../../store/workflowStore.js'

export default function StartForm() {
  const selectedNode = useWorkflowStore(s => s.selectedNode)
  const updateNodeData = useWorkflowStore(s => s.updateNodeData)
  const [title, setTitle] = useState('')
  const [metadata, setMetadata] = useState([{ key: '', value: '' }])

  useEffect(() => {
    if (!selectedNode) return
    setTitle(selectedNode.data?.startTitle || 'Start')
    const meta = selectedNode.data?.metadata
    setMetadata(meta && meta.length ? meta : [{ key: '', value: '' }])
  }, [selectedNode])

  if (!selectedNode) return null

  const handleMetaChange = (index, field, value) => {
    setMetadata(prev => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const addPair = () => {
    setMetadata(prev => [...prev, { key: '', value: '' }])
  }

  const onSave = () => {
    const cleaned = metadata.filter(m => m.key || m.value)
    updateNodeData(selectedNode.id, {
      startTitle: title,
      metadata: cleaned,
    })
  }

  return (
    <div className="form">
      <div className="form-group">
        <label className="form-label">Start title</label>
        <input
          className="form-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Employee onboarding"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Metadata (key/value)</label>
        {metadata.map((row, index) => (
          <div key={index} className="metadata-row">
            <input
              className="form-input"
              placeholder="key"
              value={row.key}
              onChange={e => handleMetaChange(index, 'key', e.target.value)}
            />
            <input
              className="form-input"
              placeholder="value"
              value={row.value}
              onChange={e => handleMetaChange(index, 'value', e.target.value)}
            />
          </div>
        ))}
        <div className="meta-actions">
          <button className="small-link" type="button" onClick={addPair}>
            + Add metadata
          </button>
        </div>
      </div>
      <button className="btn" type="button" onClick={onSave}>
        Save Start Node
      </button>
    </div>
  )
}
