import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
const PORT = 8889

const prisma = new PrismaClient();

export async function GET() {
  const comment = await getAllComment()
  return NextResponse.json(comment)
}

export async function POST(request: NextRequest) {
  const { title, comment } = await request.json()
  // console.log(title)
  // console.log(comment)
  // const response = await request.json()
  // console.log(response)

  await prisma.comment.create({
    data: {
      title: title,
      comment: comment
    }
  })

  const notes = await getAllComment()
  return NextResponse.json(notes)
}

async function getAllComment() {
  const comment = await prisma.comment.findMany()
  return comment
}