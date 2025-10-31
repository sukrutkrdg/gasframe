// app/page.tsx
// (DÜZELTİLMİŞ - @coinbase/onchainkit import'u düzeltildi)

import { getFrameMetadata } from '@coinbase/onchainkit';

// Bu fonksiyon, Vercel'de dinamik olarak çalışır ve projenin URL'sini alır
const getBaseUrl = () => {
  return process.env.VERCEL_URL
    ? `https://{process.env.VERCEL_URL}`
    : 'http://localhost:3000';
};

// Ana sayfa için Frame meta etiketlerini oluştur
export async function generateMetadata() {
  const baseUrl = getBaseUrl();
  
  // İlk Frame görüntüsünü /api/image'dan alıyoruz
  const initialImageUrl = `${baseUrl}/api/image?t=${Date.now()}`;

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: '🔄 Gas Ücretlerini Yenile',
      },
    ],
    // İlk görüntü için /api/image'ı çağırıyoruz
    image: {
      src: initialImageUrl,
      aspectRatio: '1.91:1',
    },
    // Butona basıldığında POST yapılacak URL (/api/frame)
    postUrl: `${baseUrl}/api/frame`,
  });

  return {
    title: '/onchain-lab Gas Tracker',
    description: 'Farcaster Frame for tracking ETH and Base gas prices.',
    openGraph: {
      title: '/onchain-lab Gas Tracker',
      description: 'Farcaster Frame for tracking ETH and Base gas prices.',
      images: [initialImageUrl],
    },
    other: {
      ...frameMetadata,
    },
  };
}

// Sayfa içeriği basit olabilir
export default function Home() {
  return (
    <div>
      <h1>/onchain-lab Gas Tracker Frame</h1>
      <p>Bu uygulamayı Farcaster'da paylaşın.</p>
    </div>
  );
}