import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';
import { getAuthUser } from '@/lib/api/auth';

export const dynamic = 'force-dynamic';

async function getOwnedExperience(experienceId: string, userId: string) {
  const provider = await prisma.provider.findUnique({ where: { userId } });
  if (!provider) return null;

  return prisma.experience.findFirst({
    where: { id: experienceId, providerId: provider.id },
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const existing = await getOwnedExperience(id, auth.userId);

    if (!existing) {
      return NextResponse.json({ error: 'Experience not found or access denied' }, { status: 404 });
    }

    const body = await request.json();
    const allowedFields = [
      'slug', 'titleAr', 'titleEn', 'descriptionAr', 'descriptionEn',
      'category', 'locationCity', 'priceEgp', 'priceUsd', 'durationHours',
      'maxParticipants', 'images', 'included', 'excluded', 'isActive', 'isVerified',
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (updateData.slug && updateData.slug !== existing.slug) {
      const slugExists = await prisma.experience.findUnique({
        where: { slug: updateData.slug as string },
      });
      if (slugExists) {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
      }
    }

    const experience = await prisma.experience.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ experience });
  } catch (error) {
    console.error('PATCH /api/provider/experiences/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const existing = await getOwnedExperience(id, auth.userId);

    if (!existing) {
      return NextResponse.json({ error: 'Experience not found or access denied' }, { status: 404 });
    }

    await prisma.experience.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ message: 'Experience deactivated' });
  } catch (error) {
    console.error('DELETE /api/provider/experiences/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
