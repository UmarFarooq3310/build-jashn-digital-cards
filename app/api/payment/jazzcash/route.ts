import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('[JazzCash SIM] Received:', body)
    await new Promise((r) => setTimeout(r, 1500))
    return NextResponse.json({
      success: true,
      txnRefNo: `JAZZ-SIM-${Date.now()}`,
      message: 'Simulated payment successful',
    })
  } catch (err) {
    console.error('[JazzCash Error]', err)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
