import React from 'react'
import { useWorkflowStore } from '../../store/workflowStore.js'
import StartForm from '../forms/StartForm.jsx'
import TaskForm from '../forms/TaskForm.jsx'
import ApprovalForm from '../forms/ApprovalForm.jsx'
import AutoStepForm from '../forms/AutoStepForm.jsx'
import EndForm from '../forms/EndForm.jsx'

export default function NodeFormPanel() {
  const selectedNode = useWorkflowStore(s => s.selectedNode)

  if (!selectedNode) {
    return (
      <div className="helper-text">
        Select a node on the canvas to configure fields like assignee, due date, approver role, or
        automation parameters.
      </div>
    )
  }

  const key = selectedNode.id

  switch (selectedNode.type) {
    case 'start':
      return <StartForm key={key} />
    case 'task':
      return <TaskForm key={key} />
    case 'approval':
      return <ApprovalForm key={key} />
    case 'auto':
      return <AutoStepForm key={key} />
    case 'end':
      return <EndForm key={key} />
    default:
      return <div>Unsupported node type.</div>
  }
}
