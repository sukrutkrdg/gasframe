// app/page.tsx

import { getFrameMetadata } from 'onchainkit';

// Bu fonksiyon, Vercel'de dinamik olarak çalışır ve projenin URL'sini alır
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://{process.env.VERCEL_URL}`;
  }
  // Lokal çalışma için
  return 'http://localhost:3000';
};

// Ana sayfa için Frame meta etiketlerini oluştur
export async function generateMetadata() {
  const baseUrl = getBaseUrl();
  
  // İlk Frame görüntüsünü API'mizden almamız gerekiyor
  // API'miz hem GET hem POST desteklediği için bu çalışır
  const initialImageUrl = `${baseUrl}/api/frame?t=${Date.now()}`;

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: '🔄 Gas Ücretlerini Yenile',
      },
    ],
    // İlk görüntü için API'mizi çağırıyoruz
    image: {
      src: initialImageUrl,
      aspectRatio: '1.91:1',
    },
    // Butona basıldığında POST yapılacak URL
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