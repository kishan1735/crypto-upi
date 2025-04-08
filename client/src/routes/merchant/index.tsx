import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/merchant/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/merchant/"!</div>
}
