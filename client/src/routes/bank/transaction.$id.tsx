import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bank/transaction/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bank/transaction/$id"!</div>
}
