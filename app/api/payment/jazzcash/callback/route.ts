import { NextRequest, NextResponse } from 'next/server'

const SIMULATION_MODE = true

export async function POST(req: NextRequest) {
  try {
    const { phone, amount, planId } = await req.json()

    if (!phone || !amount || !planId) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }

    if (SIMULATION_MODE) {
      await new Promise((r) => setTimeout(r, 1500))
      return NextResponse.json({
        success: true,
        txnRefNo: `JAZZ-SIM-${Date.now()}`,
        message: 'Simulated payment successful',
      })
    }

    return NextResponse.json({ success: false, message: 'Simulation mode is off but no credentials set.' }, { status: 500 })
  } catch (err) {
    console.error('[JazzCash Error]', err)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}