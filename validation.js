export function validateWorkflow(nodes, edges) {
  const issues = []

  const startNodes = nodes.filter(n => n.type === 'start')
  if (startNodes.length === 0) {
    issues.push({ level: 'error', message: 'Workflow must contain a Start node.' })
  }
  if (startNodes.length > 1) {
    issues.push({ level: 'error', message: 'Workflow must have only one Start node.' })
  }
  if (startNodes.length === 1) {
    const startId = startNodes[0].id
    const incomingToStart = edges.filter(e => e.target === startId)
    if (incomingToStart.length > 0) {
      issues.push({ level: 'error', message: 'Start node cannot have incoming connections.' })
    }
  }

  const endNodes = nodes.filter(n => n.type === 'end')
  if (endNodes.length === 0) {
    issues.push({ level: 'warning', message: 'Workflow should contain at least one End node.' })
  }

  if (nodes.length > 1 && edges.length === 0) {
    issues.push({ level: 'warning', message: 'Nodes are not connected. Add edges between steps.' })
  }

  return issues
}
