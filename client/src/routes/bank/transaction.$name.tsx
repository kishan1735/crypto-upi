import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bank/transaction/$name')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bank/transaction/$name"!</div>
}
