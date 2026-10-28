import { NextResponse } from 'next/server'
import sitemap from '@/app/sitemap'

export const dynamic = 'force-dynamic'

const INDEXNOW_KEY = 'c4rdzy1ndexn0w20268f7b2c9e4a1d6e3'
const HOST = 'cardzy.online'

export async function GET() {
  return handleIndexNowSubmission()
}

export async function POST() {
  return handleIndexNowSubmission()
}

async function handleIndexNowSubmission() {
  try {
    const sitemapEntries = sitemap()
    const urlList = sitemapEntries.map((entry) => entry.url)

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList,
    }

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    const status = response.status
    const text = await response.text()

    return NextResponse.json({
      success: status === 200 || status === 202,
      statusCode: status,
      submittedUrlsCount: urlList.length,
      response: text || 'OK',
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to submit to IndexNow',
      },
      { status: 500 }
    )
  }
}
