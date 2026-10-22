import { PageShell } from '@/components/page-shell'
import { HealthStatus } from '@/features/health/components/health-status'

const Page = () => (
  <PageShell title="Web" description="Your app is running. Start building from here.">
    <HealthStatus />
  </PageShell>
)

export default Page
