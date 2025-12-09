import React from 'react'
import { Handle, Position } from 'reactflow'

export default function EndNode({ data }) {
  return (
    <div className="node-box node-end">
      <div className="node-label-header">
        <span className="node-chip">End</span>
      </div>
      <div className="node-title">End</div>
      <div className="node-sub">{data?.endMessage || 'Workflow completion'}</div>
      {data?.summary && <div className="node-meta">Summary enabled</div>}
      <Handle type="target" position={Position.Left} />
    </div>
  )
}
