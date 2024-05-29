import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

// サーバーサイドでpdfをダウンロードさせるには直接urlをたたくしかない
//http://localhost:3000/api/puppeteer

export async function GET() {
  let browser
  try {

    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()

    const htmlTemplate = `<!DOCTYPE html>
      <html>
        <head>
          <title>test</title>
          <link rel="stylesheet" href="${ process.env.PDF_URL }/_next/static/css/app/layout.css">
        </head>
        <body>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buttons
          </button>
          <div style="page-break-after: always;"></div>
        </body>
      </html>
    `

    const htmlBox = []
    for (let i = 0; i < 2; i++) {
      htmlBox.push(htmlTemplate)
    }
    const combinedHtmlContent = htmlBox.join('')

    await page.setContent(combinedHtmlContent, { waitUntil: 'networkidle0' })
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    })

    // await page.setContent(htmlTemplate)
    // const buffer = await page.pdf({
    //   format: 'A4',
    //   printBackground: true,
    // })

    const response = new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        //'Content-Disposition': 'attachment; filename="sample.pdf"',
        'Content-Disposition': 'inline; filename="sample.pdf"',
      },
    })
  
    return response

  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}