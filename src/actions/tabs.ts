
'use server';

import fs from 'fs/promises';
import path from 'path';
import { getCategories } from '@/actions/categories';
import { revalidatePath } from 'next/cache';

export type TabSetting = {
  category: string;
  isActive: boolean;
};

// Caminho para o arquivo que armazenará as configurações das abas
const settingsFilePath = path.join(process.cwd(), 'src', 'lib', 'tab-settings.ts');

// Função para ler as configurações do arquivo.
async function readTabSettings(): Promise<TabSetting[]> {
  try {
    // Importação dinâmica para garantir que estamos lendo a versão mais recente.
    // O cache-busting com Date.now() força o Node.js a recarregar o módulo.
    const fileModule = await import(`@/lib/tab-settings?v=${Date.now()}`);
    return fileModule.TAB_SETTINGS || [];
  } catch (error) {
    // Se o arquivo não existir, retorna um array vazio.
    return [];
  }
}

// Função para escrever as configurações atualizadas no arquivo.
async function writeTabSettings(settings: TabSetting[]) {
  // Ordena para manter a consistência
  const sortedSettings = settings.sort((a, b) => a.category.localeCompare(b.category));
  const fileContent = `// Este arquivo é gerenciado automaticamente. Não edite manualmente.
export const TAB_SETTINGS: { category: string; isActive: boolean }[] = ${JSON.stringify(
  sortedSettings,
  null,
  2
)};
`;
  await fs.writeFile(settingsFilePath, fileContent, 'utf-8');
}

/**
 * Retorna as configurações de visibilidade para todas as categorias de produtos.
 * Se uma categoria não tiver uma configuração salva, ela será criada como 'ativa' por padrão.
 */
export async function getTabSettings(): Promise<TabSetting[]> {
  const allCategories = await getCategories();
  let savedSettings = await readTabSettings();

  const currentSettingsMap = new Map(savedSettings.map(s => [s.category, s.isActive]));
  
  let hasChanged = false;
  const finalSettings: TabSetting[] = allCategories.map(category => ({
    category,
    isActive: currentSettingsMap.get(category) ?? true,
  }));
  
  // Verifica se novas categorias foram adicionadas ou se categorias foram removidas
  const savedCategoryNames = new Set(savedSettings.map(s => s.category));
  const allCategoryNames = new Set(allCategories);

  if (savedCategoryNames.size !== allCategoryNames.size || !allCategories.every(cat => savedCategoryNames.has(cat))) {
      hasChanged = true;
  }

  // Se houve mudanças, ressalva o arquivo para refletir o estado atual.
  if (hasChanged) {
    // Cria um novo conjunto de configurações baseado nas categorias atuais, preservando o estado `isActive` das antigas.
    const newSettings = allCategories.map(category => ({
        category,
        isActive: currentSettingsMap.get(category) ?? true
    }));
    await writeTabSettings(newSettings);
    return newSettings.sort((a, b) => a.category.localeCompare(b.category));
  }

  return finalSettings.sort((a, b) => a.category.localeCompare(b.category));
}

/**
 * Atualiza o status de visibilidade (ativo/inativo) de uma categoria específica.
 * @param category O nome da categoria a ser atualizada.
 * @param isActive O novo status de visibilidade.
 */
export async function updateTabSettings(category: string, isActive: boolean): Promise<void> {
  let settings = await getTabSettings(); // Garante que temos a lista mais completa
  
  const settingIndex = settings.findIndex(s => s.category === category);

  if (settingIndex > -1) {
    settings[settingIndex].isActive = isActive;
  } else {
    settings.push({ category, isActive });
  }
  
  await writeTabSettings(settings);

  revalidatePath('/');
  revalidatePath('/admin/scraping');
}
