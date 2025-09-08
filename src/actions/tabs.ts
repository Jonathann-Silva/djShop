'use server';

import { getTabSettings as getTabSettingsFromProducts } from '@/lib/products';
import type { TabSetting } from '@/lib/products';

/**
 * Retorna as configurações de visibilidade para todas as categorias de produtos.
 * Os dados agora vêm de uma constante para garantir a compatibilidade com a Vercel.
 */
export async function getTabSettings(): Promise<TabSetting[]> {
  return Promise.resolve(getTabSettingsFromProducts());
}

/**
 * A atualização de abas foi desativada porque não é possível escrever
 * no sistema de arquivos em ambientes de produção como a Vercel.
 * A gestão da visibilidade das abas agora é feita diretamente no arquivo src/lib/products.ts.
 */
export async function updateTabSettings(
  category: string,
  isActive: boolean
): Promise<void> {
  throw new Error(
    'A atualização de abas via UI foi desativada para compatibilidade com a Vercel.'
  );
}
