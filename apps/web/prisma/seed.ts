import { PrismaClient, Role, ExperienceCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // 1. Admin user
    const admin = await prisma.user.upsert({
      where: { email: 'admin@egypthub.co' },
      update: {},
      create: {
        email: 'admin@egypthub.co',
        passwordHash: hashedPassword,
        name: 'Admin',
        role: Role.ADMIN,
        emailVerified: true,
      },
    });

    // 2. Provider 1: مصر للسياحة
    const provider1User = await prisma.user.upsert({
      where: { email: 'misr@egypthub.co' },
      update: {},
      create: {
        email: 'misr@egypthub.co',
        passwordHash: hashedPassword,
        name: 'مصر للسياحة',
        role: Role.PROVIDER,
        emailVerified: true,
      },
    });

    const provider1 = await prisma.provider.upsert({
      where: { userId: provider1User.id },
      update: {},
      create: {
        userId: provider1User.id,
        businessNameAr: 'مصر للسياحة',
        category: 'activity',
        locationCity: 'الغردقة',
        isVerified: true,
        isActive: true,
        averageRating: 4.5,
        totalReviews: 85,
      },
    });

    // Provider 2: النيل للرحلات
    const provider2User = await prisma.user.upsert({
      where: { email: 'nile@egypthub.co' },
      update: {},
      create: {
        email: 'nile@egypthub.co',
        passwordHash: hashedPassword,
        name: 'النيل للرحلات',
        role: Role.PROVIDER,
        emailVerified: true,
      },
    });

    await prisma.provider.upsert({
      where: { userId: provider2User.id },
      update: {},
      create: {
        userId: provider2User.id,
        businessNameAr: 'النيل للرحلات',
        category: 'yacht',
        locationCity: 'الأقصر',
        isVerified: true,
        isActive: true,
        averageRating: 4.3,
        totalReviews: 42,
      },
    });

    // 3. Experiences (all under Provider 1)
    const experiences = [
      {
        slug: 'pyramids-private-tour',
        titleAr: 'جولة خاصة في الأهرامات',
        descriptionAr: 'استمتع بجولة خاصة بصحبة مرشد سياحي محترف لزيارة أهرامات الجيزة وأبو الهول. تشمل الجولة النقل من الفندق، تذاكر الدخول، وجبة غداء تقليدية، ومشروبات منعشة. اكتشف أسرار الفراعنة واستمتع بتجربة لا تنسى.',
        category: ExperienceCategory.HISTORICAL,
        locationCity: 'الجيزة',
        priceEgp: 1500,
        images: ['https://images.unsplash.com/photo-1503177119275-0aa32b3a9368'],
        included: ['مرشد سياحي محترف', 'النقل من الفندق', 'تذاكر الدخول', 'وجبة غداء', 'مشروبات'],
        excluded: ['الإقامة', 'التأمين', 'الهدايا التذكارية'],
        averageRating: 4.8,
        totalReviews: 76,
      },
      {
        slug: 'red-sea-diving-adventure',
        titleAr: 'مغامرة الغوص في البحر الأحمر',
        descriptionAr: 'انطلق في مغامرة غوص لا تنسى في أجمل مواقع الغوص في البحر الأحمر. تشمل الرحلة جميع معدات الغوص، مدرب معتمد، وجبة غداء على متن اليخت، ومشاهدة الشعاب المرجانية الخلابة والأسماك الملونة.',
        category: ExperienceCategory.WATER_SPORTS,
        locationCity: 'الغردقة',
        priceEgp: 2000,
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5'],
        included: ['معدات الغوص كاملة', 'مدرب معتمد', 'وجبة غداء', 'مشروبات', 'توصيل من الفندق'],
        excluded: ['كاميرا تحت الماء', 'التأمين الشخصي'],
        averageRating: 4.9,
        totalReviews: 54,
      },
      {
        slug: 'luxor-temple-tour',
        titleAr: 'رحلة معابد الأقصر',
        descriptionAr: 'جولة شاملة لزيارة أهم المعابد في الأقصر: معبد الكرنك، معبد الأقصر، وادي الملوك، ومعبد حتشبسوت. تشمل الجولة مرشد سياحي متخصص، تذاكر الدخول، ووجبة غداء في مطعم محلي.',
        category: ExperienceCategory.HISTORICAL,
        locationCity: 'الأقصر',
        priceEgp: 1200,
        images: ['https://images.unsplash.com/photo-1560200353-ce0a76b1d438'],
        included: ['مرشد سياحي', 'تذاكر الدخول لجميع المواقع', 'وجبة غداء', 'مشروبات', 'النقل'],
        excluded: ['الإقامة', 'تأشيرة الدخول'],
        averageRating: 4.7,
        totalReviews: 93,
      },
      {
        slug: 'nile-cruise-luxor-aswan',
        titleAr: 'رحلة نيلية من الأقصر إلى أسوان',
        descriptionAr: 'رحلة نيلية رائعة على متن مركب فاخر من الأقصر إلى أسوان. استمتع بمناظر النيل الخلابة، زيارة المعابد على طول الطريق، والعروض الترفيهية المسائية. تشمل الرحلة جميع الوجبات والإقامة.',
        category: ExperienceCategory.NILE,
        locationCity: 'الأقصر',
        priceEgp: 1800,
        images: ['https://images.unsplash.com/photo-1569336415962-a4bd9f18cdb3'],
        included: ['الإقامة في كابينة فاخرة', 'جميع الوجبات', 'المشروبات غير الكحولية', 'الأنشطة الترفيهية', 'زيارة المعابد'],
        excluded: ['المشروبات الكحولية', 'البقشيش', 'التأمين'],
        averageRating: 4.5,
        totalReviews: 38,
      },
      {
        slug: 'desert-safari',
        titleAr: 'سفاري الصحراء',
        descriptionAr: 'مغامرة سفاري مثيرة في صحراء مصر. استمتع بركوب الدراجات الرباعية، التزلج على الرمال، ركوب الجمال، ومشاهدة غروب الشمس الرائع في الصحراء. تشمل الرحلة وجبة عشاء بدوية تحت النجوم.',
        category: ExperienceCategory.ADVENTURE,
        locationCity: 'الغردقة',
        priceEgp: 800,
        images: ['https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3'],
        included: ['ركوب الدراجات الرباعية', 'التزلج على الرمال', 'ركوب الجمال', 'وجبة عشاء بدوية', 'النقل'],
        excluded: ['التأمين', 'التصوير الاحترافي'],
        averageRating: 4.6,
        totalReviews: 67,
      },
    ];

    for (const exp of experiences) {
      await prisma.experience.upsert({
        where: { slug: exp.slug },
        update: {},
        create: {
          slug: exp.slug,
          titleAr: exp.titleAr,
          descriptionAr: exp.descriptionAr,
          category: exp.category,
          locationCity: exp.locationCity,
          priceEgp: exp.priceEgp,
          images: exp.images,
          included: exp.included,
          excluded: exp.excluded,
          isActive: true,
          isVerified: true,
          averageRating: exp.averageRating,
          totalReviews: exp.totalReviews,
          providerId: provider1.id,
        },
      });
    }

    // 4. Stories (for the admin user)
    const stories = [
      {
        slug: 'sunset-over-the-pyramids',
        titleAr: 'غروب فوق الأهرامات',
        bodyAr: 'لا شيء يضاهي مشهد غروب الشمس خلف أهرامات الجيزة. في تلك اللحظة السحرية، تتحول أحجار الأهرامات القديمة إلى لوحة فنية بألوان الذهب والبرتقالي والأرجواني. إنها تجربة تأخذك في رحلة عبر الزمن، حيث يمكنك التأمل في عظمة الحضارة المصرية القديمة بينما تغرب الشمس في الأفق البعيد. كانت الزيارة في فصل الربيع حيث الطقس معتدل والسماء صافية، مما جعل المنظر أكثر روعة. أنصح الجميع بتجربة هذه اللحظة الساحرة التي ستبقى في الذاكرة للأبد.',
        category: 'adventure',
        coverImage: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368',
        readTimeMinutes: 5,
      },
      {
        slug: 'diving-red-sea-magic',
        titleAr: 'الغوص في سحر البحر الأحمر',
        bodyAr: 'البحر الأحمر هو كنز طبيعي حقيقي يضم بعضاً من أجمل الشعاب المرجانية في العالم. في رحلة الغوص الأخيرة، استكشفت موقعاً جديداً بالقرب من الغردقة حيث تزخر المياه بالحياة البحرية المذهلة. رأينا أسماك الملاك الملونة، السلاحف البحرية العملاقة، وحتى سمكة المهرج الشهيرة. الشعاب المرجانية هناك سليمة ونقية، مما يعكس جهود الحفاظ على البيئة البحرية. الماء كان دافئاً وصافياً مع رؤية تصل إلى 30 متراً. إنها تجربة لا يمكن وصفها بالكلمات، يجب أن تعيشها بنفسك لتشعر بروعة العالم تحت الماء.',
        category: 'adventure',
        coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
        readTimeMinutes: 6,
      },
    ];

    for (const story of stories) {
      await prisma.story.upsert({
        where: { slug: story.slug },
        update: {},
        create: {
          slug: story.slug,
          titleAr: story.titleAr,
          bodyAr: story.bodyAr,
          category: story.category,
          coverImage: story.coverImage,
          readTimeMinutes: story.readTimeMinutes,
          authorId: admin.id,
          isPublished: true,
          isFeatured: true,
          publishedAt: new Date(),
        },
      });
    }

    // 5. Offer
    await prisma.offer.upsert({
      where: { code: 'WELCOME10' },
      update: {},
      create: {
        code: 'WELCOME10',
        titleAr: 'خصم ترحيب 10%',
        titleEn: 'Welcome 10% Off',
        descriptionAr: 'احصل على خصم 10% على أول حجز لك',
        descriptionEn: 'Get 10% off on your first booking',
        discountType: 'percentage',
        discountValue: 10,
        minBookingValue: 0,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        isActive: true,
        applicableTo: 'all',
      },
    });

    console.log('Seed complete:');
    console.log('  Admin: admin@egypthub.co');
    console.log('  Provider 1: misr@egypthub.co (مصر للسياحة)');
    console.log('  Provider 2: nile@egypthub.co (النيل للرحلات)');
    console.log('  Experiences: 5 created under Provider 1');
    console.log('  Stories: 2 created');
    console.log('  Offer: WELCOME10 created');
    console.log('  Password (all): admin123');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
