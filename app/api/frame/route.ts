// app/api/frame/route.ts
// (DÜZELTİLMİŞ - img width/height)

import { NextRequest, NextResponse } from 'next/server';
import {
  getFrameHtmlResponse,
  FrameRequest,
  getFrameMessage,
} from '@coinbase/onchainkit';

import { ImageResponse } from 'next/server';
import { createPublicClient, http, formatGwei } from 'viem';
import { mainnet, base } from 'viem/chains';

// Viem istemcilerini .env dosyasındaki URL'ler ile oluştur
const ethClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.ETH_RPC_URL),
});

const baseClient = createPublicClient({
  chain: base,
  transport: http(process.env.BASE_RPC_URL),
});

// Gas ücretlerini çeken asenkron fonksiyon
async function getGasPrices() {
  try {
    const [ethGas, baseGas] = await Promise.all([
      ethClient.getGasPrice(),
      baseClient.getGasPrice(),
    ]);

    // GWEI formatına çevir
    return {
      eth: formatGwei(ethGas),
      base: formatGwei(baseGas),
    };
  } catch (error) {
    console.error('Error fetching gas prices:', error);
    return { eth: 'N/A', base: 'N/A' };
  }
}

// Farcaster'dan POST isteği geldiğinde bu fonksiyon çalışır
export async function POST(req: NextRequest): Promise<Response> {
  // "Yenile" butonuna basıldığında
  const { eth, base } = await getGasPrices();

  // Dinamik olarak o anki resmi oluştur
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0D1117',
          color: '#C9D1D9',
          fontFamily: '"Arial", sans-serif',
          fontSize: 48,
          border: '2px solid #30363D',
          borderRadius: 16,
        }}
      >
        <div style={{ display: 'flex', color: '#58A6FF', marginBottom: 20 }}>
          /onchain-lab Gas Tracker (Faz 1)
        </div>
        <div style={{ display: 'flex', marginBottom: 15 }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg"
            width={50} // DÜZELTME BURADA
            height={50} // DÜZELTME BURADA
            style={{ marginRight: 20 }}
          />
          Ethereum: {parseFloat(eth).toFixed(2)} Gwei
        </div>
        <div style={{ display: 'flex' }}>
          <img
            src="https://raw.githubusercontent.com/base-org/brand-kit/main/logo/symbol/Base_Symbol_Blue.svg"
            width={50} // DÜZELTME BURADA
            height={50} // DÜZELTME BURADA
            style={{ marginRight: 20 }}
          />
          Base: {parseFloat(base).toFixed(2)} Gwei
        </div>
        <div style={{ fontSize: 24, color: '#8B949E', marginTop: 30 }}>
          Updated: {new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/Istanbul' })}
        </div>
      </div>
    ),
    {
      width: 800,
      height: 418,
    },
  );

  // Farcaster'a HTML cevabını gönder
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: '🔄 Yenile',
        },
      ],
      image: {
        src: `data:image/png;base64,${Buffer.from(
          await imageResponse.arrayBuffer(),
        ).toString('base64')}`,
        aspectRatio: '1.91:1',
      },
      postUrl: `${new URL(req.url).origin}/api/frame`, 
    }),
  );
}

// GET isteği için de bir handler ekleyelim
export async function GET(req: NextRequest): Promise<Response> {
    return POST(req);
}