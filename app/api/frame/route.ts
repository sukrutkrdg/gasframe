// app/api/frame/route.ts
// (DÜZELTİLMİŞ - Resim oluşturma kodu kaldırıldı)

import { NextRequest, NextResponse } from 'next/server';
import {
  getFrameHtmlResponse,
  FrameRequest,
  getFrameMessage,
} from 'onchainkit';

// Ana URL'yi al
const getBaseUrl = () => {
  return process.env.VERCEL_URL
    ? `https://{process.env.VERCEL_URL}`
    : 'http://localhost:3000';
};

// Farcaster'dan POST isteği geldiğinde bu fonksiyon çalışır
export async function POST(req: NextRequest): Promise<Response> {
  const baseUrl = getBaseUrl();

  // "Yenile" butonuna basıldığında,
  // resim URL'sine cache'i kırmak için o anki zamanı ekliyoruz
  const imageUrl = `${baseUrl}/api/image?t=${Date.now()}`;

  // Farcaster'a HTML cevabını gönder
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: '🔄 Yenile',
        },
      ],
      // Resim olarak /api/image endpoint'ini göster
      image: {
        src: imageUrl,
        aspectRatio: '1.91:1',
      },
      postUrl: `${baseUrl}/api/frame`, // Tekrar bu fonksiyona post et
    }),
  );
}

// GET isteği için de bir handler ekleyelim (ilk yükleme için)
export async function GET(req: NextRequest): Promise<Response> {
  // Proje ilk yüklendiğinde de Frame'i göster
  return POST(req);
}