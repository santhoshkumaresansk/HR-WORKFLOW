import { create } from 'zustand'
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow'

let idCounter = 1
const nextId = (prefix = 'node') => `${prefix}-${idCounter++}`

function defaultDataForType(type) {
  switch (type) {
    case 'start':
      return { startTitle: 'Start', metadata: [] }
    case 'task':
      return {
        title: 'Task',
        description: '',
        assignee: '',
        dueDate: '',
        customFields: [],
      }
    case 'approval':
      return {
        title: 'Approval',
        approverRole: 'Manager',
        autoApproveThreshold: 0,
      }
    case 'auto':
      return {
        title: 'Automation',
        actionId: '',
        params: {},
      }
    case 'end':
      return {
        endMessage: 'Workflow completed',
        summary: true,
      }
    default:
      return {}
  }
}

const initialNodes = [
  {
    id: nextId('start'),
    type: 'start',
    position: { x: 120, y: 150 },
    data: defaultDataForType('start'),
  },
]

export const useWorkflowStore = create((set, get) => ({
  nodes: initialNodes,
  edges: [],
  selectedNode: null,
  activeRightTab: 'inspector',

  setNodes: nodes => set({ nodes }),
  setEdges: edges => set({ edges }),

  onNodesChange: changes =>
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    }),

  onEdgesChange: changes =>
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),

  onConnect: connection =>
    set({
      edges: addEdge({ ...connection, type: 'smoothstep', animated: false }, get().edges),
    }),

  selectNode: node => set({ selectedNode: node }),
  clearSelection: () => set({ selectedNode: null }),

  updateNodeData: (id, data) => {
    const nodes = get().nodes.map(n =>
      n.id === id
        ? {
            ...n,
            data: {
              ...n.data,
              ...data,
            },
          }
        : n
    )
    const selected = get().selectedNode
    let updatedSelected = selected
    if (selected && selected.id === id) {
      updatedSelected = {
        ...selected,
        data: {
          ...selected.data,
          ...data,
        },
      }
    }
    set({ nodes, selectedNode: updatedSelected })
  },

  addNode: (type, position) => {
    const id = nextId(type)
    const node = {
      id,
      type,
      position,
      data: defaultDataForType(type),
    }
    set({ nodes: [...get().nodes, node] })
  },

  deleteNodeById: id => {
    const nodes = get().nodes.filter(n => n.id !== id)
    const edges = get().edges.filter(e => e.source !== id && e.target !== id)
    set({ nodes, edges })
  },

  setActiveRightTab: tab => set({ activeRightTab: tab }),
}))
