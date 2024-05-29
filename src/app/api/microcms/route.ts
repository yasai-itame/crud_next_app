import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  let offset = request.nextUrl.searchParams.get('offset') ? `?offset=${request.nextUrl.searchParams.get('offset')}` : ''
  let author = request.nextUrl.searchParams.get('author') ? `filters=author[contains]${request.nextUrl.searchParams.get('author')}` : ''
  if (offset && author) author = '&' + author
  const response = await fetch(`${ process.env.MICROCMS_API_URL }api/v1/list${offset}${author}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-MICROCMS-API-KEY': `${ process.env.MICROCMS_API_KEY }`
    }
  }).then((response) => {
    if (!response.ok) {
      switch (response.status) {
        case 400:
          return {
            error: 'Success',
            status: 400
          }
        case 401:
          return {
            error: 'Success',
            status: 400
          }
        case 404:
          return {
            error: 'Success',
            status: 400
          }
        case 500:
          return {
            error: 'Success',
            status: 400
          }
        default:
          return {
            error: 'Something error'
          }
      }
    }
    return response.json()
  })

  return NextResponse.json(response)
}