import api, { handleApiError } from '..';
export const getClientTags = async (
  id: number,
  signal?: AbortSignal,
): Promise<string[]> => {
  try {
    const { data } = await api.get<string[]>(`/clients/${id}/tags`, { signal });
    return data;
  } catch (error) {
    throw handleApiError(error, 'Не удалось загрузить теги');
  }
};
export const replaceClientTags = async ({
  id,
  tags,
}: {
  id: number;
  tags: string[];
}): Promise<void> => {
  try {
    await api.put(`/clients/${id}/tags`, { tags });
  } catch (error) {
    throw handleApiError(error, 'Не удалось сохранить теги');
  }
};
