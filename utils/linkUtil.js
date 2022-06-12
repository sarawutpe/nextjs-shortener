import { customAlphabet } from 'nanoid/async';

export const linkUtil = {
  getUniqueShortLink: async () => {
    const customId = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const uniqueLink = customAlphabet(customId, 6);
    const id = await uniqueLink();
    return id;
  },
};
