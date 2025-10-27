import { getSheetsData } from '@/lib/sheets'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await getSheetsData()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch services' }, { status: 500 })
  }
}
