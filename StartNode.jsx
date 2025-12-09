import React from 'react'
import { Handle, Position } from 'reactflow'

export default function StartNode({ data }) {
  return (
    <div className="node-box node-start">
      <div className="node-label-header">
        <span className="node-chip">Start</span>
      </div>
      <div className="node-title">{data?.startTitle || 'Start'}</div>
      <div className="node-sub">Workflow entry point</div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}
