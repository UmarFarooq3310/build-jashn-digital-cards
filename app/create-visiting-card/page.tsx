import type { Metadata } from 'next'
import { CreateVisitingCardWrapper } from './create-visiting-card-wrapper'
import { CreateVisitingCardProse } from './create-visiting-card-prose'

export const metadata: Metadata = {
  title: 'Create Smart Digital Business Cards (vCard) | Cardzy',
  description: 'Build smart executive digital business cards with scannable QR codes, 1-tap contact vCard download, and Google Maps office pins.',
  alternates: {
    canonical: 'https://cardzy.online/create-visiting-card',
  },
}

export default function CreateVisitingCardPage() {
  return (
    <>
      <CreateVisitingCardWrapper />
      <CreateVisitingCardProse />
    </>
  )
}
