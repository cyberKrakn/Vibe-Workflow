"use client"
import dynamic from 'next/dynamic'
import { use } from 'react'
import "reactflow/dist/style.css"
import "react-toastify/dist/ReactToastify.css";
import "workflow-builder/dist/tailwind.css"

const WorkflowBuilder = dynamic(
  () => import('workflow-builder').then(m => m.WorkflowBuilder),
  { ssr: false }
)

const Workflow = ({ params }) => {
  const { id } = use(params)
  return (
    <div className="h-screen w-screen bg-black">
      <WorkflowBuilder workflowId={id} />
    </div>
  )
}

export default Workflow;
