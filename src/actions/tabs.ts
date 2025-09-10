'use server';

import { getCategories } from '@/lib/products';

export type TabSetting = {
  category: string;
  isActive: boolean;
};

/**
 * Retorna as configurações de visibilidade para todas as categorias de produtos.
 * A lógica foi simplificada para retornar todas as categorias como ativas,
 * para compatibilidade com a Vercel.
 */
export async function getTabSettings(): Promise<TabSetting[]> {
  const categories = getCategories();
  // Assume all categories from products are active
  const tabSettings: TabSetting[] = categories.map(category => ({
    category,
    isActive: true,
  }));
  return Promise.resolve(tabSettings);
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
