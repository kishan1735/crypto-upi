import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bank/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bank/$id"!</div>
}
