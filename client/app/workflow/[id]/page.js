"use client"
import dynamic from 'next/dynamic'
import "reactflow/dist/style.css"
import "react-toastify/dist/ReactToastify.css";
import "workflow-builder/dist/tailwind.css"

const WorkflowBuilder = dynamic(
  () => import('workflow-builder').then(m => m.WorkflowBuilder),
  { ssr: false }
)

const Workflow = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <WorkflowBuilder />
    </div>
  )
}

export default Workflow;
