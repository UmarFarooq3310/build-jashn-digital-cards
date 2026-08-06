'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const CreateVisitingCardClientTool = dynamic(
  () => import('./create-visiting-card-client'),
  {
    ssr: false,
    loading: () => (
      <div className="flex py-24 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-emerald-700" />
      </div>
    ),
  }
)

export function CreateVisitingCardWrapper() {
  return <CreateVisitingCardClientTool />
}
