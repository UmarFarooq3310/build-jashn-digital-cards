'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const CreateInvitationClientTool = dynamic(
  () => import('./create-invitation-client'),
  {
    ssr: false,
    loading: () => (
      <div className="flex py-24 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#7B0D1E]" />
      </div>
    ),
  }
)

export function CreateInvitationWrapper() {
  return <CreateInvitationClientTool />
}
