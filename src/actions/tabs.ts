
'use server';

import fs from 'fs/promises';
import path from 'path';
import { getCategories } from '@/lib/products';
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
  const allCategories = getCategories();
  let savedSettings = await readTabSettings();

  const currentSettingsMap = new Map(savedSettings.map(s => [s.category, s.isActive]));
  
  const finalSettings: TabSetting[] = allCategories.map(category => ({
    category,
    // Se não houver configuração salva, define como ativa por padrão.
    isActive: currentSettingsMap.get(category) ?? true,
  }));

  // Se o número de categorias mudou (ex: uma nova foi adicionada),
  // ressalva o arquivo para incluir a nova categoria.
  if (finalSettings.length !== savedSettings.length) {
    await writeTabSettings(finalSettings);
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
    // Isso não deveria acontecer com a lógica atual, mas é uma salvaguarda.
    settings.push({ category, isActive });
  }
  
  await writeTabSettings(settings);

  // Revalida o cache da página inicial para que as mudanças apareçam imediatamente.
  revalidatePath('/');
}

