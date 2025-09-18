
import { NextResponse } from 'next/server';
import { updateAllProductPrices } from '@/lib/price-updater';

// Para proteger esta rota, você pode usar um "segredo" na URL.
// Ex: https://seu-site.com/api/cron?secret=SUA_CHAVE_SECRETA
// No Cloud Scheduler, você configuraria a URL com este segredo.
const CRON_SECRET = process.env.CRON_SECRET || "sua-chave-secreta-padrao";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  }

  console.log('Tarefa agendada (CRON Job) acionada com sucesso. Iniciando atualização de preços...');

  try {
    const result = await updateAllProductPrices();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro na execução da rota cron:', error);
    return NextResponse.json({ error: 'Falha ao executar a tarefa agendada.' }, { status: 500 });
  }
}
