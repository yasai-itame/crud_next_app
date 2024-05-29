import { NextResponse, NextRequest } from "next/server"
import { MemberType } from "../../type/Member"
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

export async function GET() {
  const members = await getAllMember()
  return NextResponse.json(members)
}

async function getAllMember() {
  const member = await prisma.member.findMany({
    select: {
      id: true,
      name: true,
      age: true,
      email: true,
      createdAt: true
      // comments: {
      //   select: {
      //     comment: true
      //   }
      // }
    },
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  })
  return member
}

export async function PUT(request: MemberType) {
  //const data = request.json()
  //if (data.id == 'undefined') return
  console.log(request)
  // await prisma.member.update({
  //   where: {
  //     id: request.id
  //   },
  //   data: {
  //     name: request.name,
  //     email: request.email
  //   }
  // })

  return NextResponse.json('success')
}