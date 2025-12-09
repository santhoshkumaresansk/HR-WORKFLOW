import React from 'react'

const NODE_TYPES = [
  {
    type: 'start',
    label: 'Start Node',
    caption: 'Workflow entry point',
    tag: 'Entry',
  },
  {
    type: 'task',
    label: 'Task Node',
    caption: 'Human task step',
    tag: 'Human',
  },
  {
    type: 'approval',
    label: 'Approval Node',
    caption: 'Manager / HR approval',
    tag: 'Approver',
  },
  {
    type: 'auto',
    label: 'Automated Step',
    caption: 'System triggered',
    tag: 'System',
  },
  {
    type: 'end',
    label: 'End Node',
    caption: 'Workflow completion',
    tag: 'Exit',
  },
]

export default function NodeSidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow-node-type', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="node-palette">
      <p className="helper-text">Drag any node type to the canvas or connect existing nodes.</p>
      {NODE_TYPES.map(item => (
        <div
          key={item.type}
          className="palette-item"
          draggable
          onDragStart={event => onDragStart(event, item.type)}
        >
          <div className="palette-item-label">
            <span className="palette-item-name">{item.label}</span>
            <span className="palette-item-caption">{item.caption}</span>
          </div>
          <span className="palette-item-tag">{item.tag}</span>
        </div>
      ))}
    </div>
  )
}
