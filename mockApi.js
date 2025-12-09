const automations = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'notify_slack', label: 'Notify Slack', params: ['channel', 'message'] },
]

export function getAutomations() {
  // Simulate GET /automations
  return new Promise(resolve => {
    setTimeout(() => resolve(automations), 300)
  })
}

export function simulateWorkflow(workflowJson) {
  // Simulate POST /simulate
  return new Promise(resolve => {
    setTimeout(() => {
      const steps = []
      workflowJson.nodes.forEach((node, index) => {
        const label =
          node.type === 'start'
            ? node.data?.startTitle || 'Start'
            : node.data?.title ||
              node.data?.endMessage ||
              node.type
        steps.push(`Step ${index + 1}: executed "${label}" (${node.type})`)
      })
      resolve({
        steps,
      })
    }, 600)
  })
}
