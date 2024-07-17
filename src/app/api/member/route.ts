import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = Number(searchParams.get('page'))
  const skip = 10 * (query - 1)
  const members = await getAllMember(skip)
  return NextResponse.json(members)
}

async function getAllMember(skips:number) {
  try {
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
      skip: skips,
      take: 10,
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    })

    return member
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P1000') {
        return {
          message: "データベース サーバーに対する認証に失敗しました。",
          success: false
        }
      }
      if (e.code === 'P1001') {
        return {
          message: "データベース サーバーにアクセスできません。",
          success: false
        }
      }
      if (e.code === 'P2002') {
        return {
          message: "一意制約が失敗しました。",
          success: false
        }
      }
      if (e.code === 'P6100') {
        return {
          message: "予期しないサーバーエラーが発生しました。",
          success: false
        }
      }
    }
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    if (data.id == 'undefined') return
    const result = await prisma.member.update({
      where: {
        id: data.id
      },
      data: {
        name: data.name,
        email: data.email
      }
    })
    return NextResponse.json(result)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      let error
      if (e.code === 'P1000') {
        error = {
          message: "データベース サーバーに対する認証に失敗しました。",
          success: false
        }
      }
      if (e.code === 'P1001') {
        error = {
          message: "データベース サーバーにアクセスできません。",
          success: false
        }
      }
      if (e.code === 'P2002') {
        error = {
          message: "一意制約が失敗しました。",
          success: false
        }
      }
      if (e.code === 'P6100') {
        error = {
          message: "予期しないサーバーエラーが発生しました。",
          success: false
        }
      }
      return NextResponse.json(error)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const result = await prisma.member.create({
      data: {
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password
      }
    })
    console.log(request)
    console.log(result)
    return NextResponse.json(result)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      let error
      if (e.code === 'P1000') {
        error = {
          message: "データベース サーバーに対する認証に失敗しました。",
          success: false
        }
      }
      if (e.code === 'P1001') {
        error = {
          message: "データベース サーバーにアクセスできません。",
          success: false
        }
      }
      if (e.code === 'P2002') {
        error = {
          message: "一意制約が失敗しました。",
          success: false
        }
      }
      if (e.code === 'P6100') {
        error = {
          message: "予期しないサーバーエラーが発生しました。",
          success: false
        }
      }
      return NextResponse.json(error)
    }
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json()
    if (data.id == 'undefined') return
    const result = await prisma.member.delete({
      where: {
        id: data.id
      }
    })
    return NextResponse.json(result)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      let error
      if (e.code === 'P1000') {
        error = {
          message: "データベース サーバーに対する認証に失敗しました。",
          success: false
        }
      }
      if (e.code === 'P1001') {
        error = {
          message: "データベース サーバーにアクセスできません。",
          success: false
        }
      }
      if (e.code === 'P2002') {
        error = {
          message: "一意制約が失敗しました。",
          success: false
        }
      }
      if (e.code === 'P6100') {
        error = {
          message: "予期しないサーバーエラーが発生しました。",
          success: false
        }
      }
      return NextResponse.json(error)
    }
  }
}