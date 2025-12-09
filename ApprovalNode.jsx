import React from 'react'
import { Handle, Position } from 'reactflow'

export default function ApprovalNode({ data }) {
  return (
    <div className="node-box node-approval">
      <div className="node-label-header">
        <span className="node-chip">Approval</span>
      </div>
      <div className="node-title">{data?.title || 'Approval'}</div>
      <div className="node-sub">
        {data?.approverRole ? `Role: ${data.approverRole}` : 'Approver role not set'}
      </div>
      <div className="node-meta">
        Auto-approve threshold: {data?.autoApproveThreshold ?? 0}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}
