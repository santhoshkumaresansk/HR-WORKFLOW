import React from 'react'
import { Handle, Position } from 'reactflow'

export default function AutoNode({ data }) {
  return (
    <div className="node-box node-auto">
      <div className="node-label-header">
        <span className="node-chip">Automated</span>
      </div>
      <div className="node-title">{data?.title || 'Automated Step'}</div>
      <div className="node-sub">
        {data?.actionId ? `Action: ${data.actionId}` : 'No action selected'}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}
