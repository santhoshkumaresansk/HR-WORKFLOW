import React from 'react'
import { Handle, Position } from 'reactflow'

export default function TaskNode({ data }) {
  return (
    <div className="node-box node-task">
      <div className="node-label-header">
        <span className="node-chip">Task</span>
      </div>
      <div className="node-title">{data?.title || 'Task'}</div>
      <div className="node-sub">
        {data?.assignee ? `Assignee: ${data.assignee}` : 'Unassigned human step'}
      </div>
      {data?.dueDate && <div className="node-meta">Due: {data.dueDate}</div>}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}
