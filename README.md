# HR Workflow Designer (Vite + React + React Flow)

This project is a functional prototype of an **HR Workflow Designer** as described in the exercise spec.

It demonstrates:

- React Flow canvas with multiple **custom node types**
- A **Node Palette** with drag-and-drop from sidebar to canvas
- **Node configuration forms** that depend on node type
- A small **mock API layer** (GET /automations and POST /simulate) implemented with local mocks
- A **Workflow Sandbox** panel that validates and simulates the workflow

## Tech Stack

- Vite + React (JavaScript)
- React Flow
- Zustand (global state for workflow)
- Simple local mock API functions

## Running the project

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (e.g. http://localhost:5173).

## Main Features

### 1. Workflow Canvas

Located in `src/components/canvas/WorkflowCanvas.jsx`.

- Uses React Flow with custom node types:
  - **Start Node** (`start`)
  - **Task Node** (`task`)
  - **Approval Node** (`approval`)
  - **Automated Step Node** (`auto`)
  - **End Node** (`end`)
- Nodes are added by dragging node types from the **Node Palette** onto the canvas
- You can connect nodes with edges, select nodes, and edit them in the inspector

### 2. Node Editing / Configuration Forms

Located in `src/components/forms/` and wired through `NodeFormPanel.jsx`.

Each node has its own configuration:

- **Start Node**
  - `startTitle`
  - `metadata` (key/value pairs)
- **Task Node**
  - `title` (required)
  - `description`
  - `assignee`
  - `dueDate`
- **Approval Node**
  - `title`
  - `approverRole` (Manager / HRBP / Director / Finance)
  - `autoApproveThreshold` (number)
- **Automated Step Node**
  - `title`
  - Action selection from `GET /automations`
  - Dynamic parameters based on the selected action
- **End Node**
  - `endMessage`
  - `summary` flag (boolean)

These are implemented as controlled forms and synchronised with the underlying React Flow nodes via Zustand.

### 3. Mock API Layer

Defined in `src/api/mockApi.js`.

- `getAutomations()` simulates **GET /automations**:
  - Returns hard-coded actions with parameter definitions
- `simulateWorkflow(workflowJson)` simulates **POST /simulate**:
  - Reads the workflow JSON (`nodes` and `edges`)
  - Returns a simple list of "Step N: executed ..."

The **Automated Step Node form** uses `getAutomations()` to populate a dropdown and render dynamic parameter inputs.

### 4. Workflow Testing / Sandbox Panel

Implemented in `src/components/test/WorkflowTester.jsx` and rendered in the right-hand panel (tab "Workflow Sandbox").

- Serializes the current `nodes` and `edges`
- Runs `validateWorkflow(...)` from `src/utils/validation.js` to check for:
  - Missing Start node
  - More than one Start node
  - Start node with incoming edges
  - Missing End node (warning)
  - No edges while multiple nodes exist (warning)
- If there are no errors, calls `simulateWorkflow(...)` and displays the returned execution steps as a log.

### 5. State Management & Architecture

- `src/store/workflowStore.js`:
  - Holds `nodes`, `edges`, `selectedNode`, `activeRightTab`
  - Wraps React Flow handlers (`onNodesChange`, `onEdgesChange`, `onConnect`)
  - Exposes helper actions like `addNode`, `updateNodeData`, `selectNode`
- `src/components/` separation:
  - `canvas/` – React Flow canvas and custom nodes
  - `sidebar/` – Node palette
  - `panel/` – Node form wrapper
  - `forms/` – Per-node forms
  - `test/` – Workflow Sandbox

The code is structured so adding new node types or extending validation is straightforward.

## What Could Be Added With More Time

- Export/import workflow JSON from the header button
- Undo/redo support
- Visual validation errors shown directly on nodes
- Auto-layout options
- Richer styling/system design library integration
