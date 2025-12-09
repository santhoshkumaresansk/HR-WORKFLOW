import React, { useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow'
import { useWorkflowStore } from '../../store/workflowStore.js'
import StartNode from './StartNode.jsx'
import TaskNode from './TaskNode.jsx'
import ApprovalNode from './ApprovalNode.jsx'
import AutoNode from './AutoNode.jsx'
import EndNode from './EndNode.jsx'

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  auto: AutoNode,
  end: EndNode,
}

function InnerCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, selectNode, addNode } =
    useWorkflowStore()
  const reactFlow = useReactFlow()

  const onDrop = useCallback(
    event => {
      event.preventDefault()
      const type = event.dataTransfer.getData('application/reactflow-node-type')
      if (!type) return

      const bounds = event.currentTarget.getBoundingClientRect()
      const position = reactFlow.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      })
      addNode(type, position)
    },
    [reactFlow, addNode]
  )

  const onDragOver = useCallback(event => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  return (
    <div className="canvas" style={{ width: '100%', height: '100%' }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(e, node) => selectNode(node)}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background gap={22} size={1} color="#1e293b" />
        <MiniMap pannable zoomable />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <InnerCanvas />
    </ReactFlowProvider>
  )
}
