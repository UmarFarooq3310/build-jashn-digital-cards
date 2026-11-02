import { NextRequest, NextResponse } from 'next/server'
import sitemap from '@/app/sitemap'

export const dynamic = 'force-dynamic'

const INDEXNOW_KEY = 'c4rdzy1ndexn0w20268f7b2c9e4a1d6e3'
const HOST = 'cardzy.online'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const singleUrl = searchParams.get('url')
  const urls = singleUrl ? [singleUrl] : undefined
  return handleIndexNowSubmission(urls)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    let urls: string[] | undefined

    if (body?.urls && Array.isArray(body.urls)) {
      urls = body.urls
    } else if (body?.urlList && Array.isArray(body.urlList)) {
      urls = body.urlList
    } else if (body?.url && typeof body.url === 'string') {
      urls = [body.url]
    }

    return handleIndexNowSubmission(urls)
  } catch {
    return handleIndexNowSubmission()
  }
}

async function handleIndexNowSubmission(customUrls?: string[]) {
  try {
    const urlList =
      customUrls && customUrls.length > 0
        ? customUrls
        : sitemap().map((entry) => entry.url)

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList,
    }

    // Submit in parallel to all major IndexNow search engine hubs
    const endpoints = [
      { name: 'indexnow', url: 'https://api.indexnow.org/indexnow' },
      { name: 'bing', url: 'https://www.bing.com/indexnow' },
      { name: 'yandex', url: 'https://yandex.com/indexnow' },
      { name: 'seznam', url: 'https://search.seznam.cz/indexnow' },
      { name: 'naver', url: 'https://searchadvisor.naver.com/indexnow' },
    ]

    const results = await Promise.allSettled(
      endpoints.map((ep) =>
        fetch(ep.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        }).then((res) => ({ name: ep.name, status: res.status }))
      )
    )

    const endpointStatus: Record<string, number | string> = {}
    let successfulCount = 0

    results.forEach((res, index) => {
      const epName = endpoints[index].name
      if (res.status === 'fulfilled') {
        endpointStatus[epName] = res.value.status
        if ([200, 202].includes(res.value.status)) {
          successfulCount++
        }
      } else {
        endpointStatus[epName] = 'failed'
      }
    })

    return NextResponse.json({
      success: successfulCount > 0,
      submittedUrlsCount: urlList.length,
      endpoints: endpointStatus,
      googleNotice:
        'Google does not use IndexNow. Submit your sitemap at https://search.google.com/search-console (https://cardzy.online/sitemap.xml).',
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
