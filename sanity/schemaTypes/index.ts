import { blockContentType } from './blockContentType';
import { categoryType } from './categoryType';
import { postType } from './postType';
import { authorType } from './authorType';
import { profileType } from './profile';

export const schemaTypes = [
  blockContentType,
  categoryType,
  postType,
  authorType,
  profileType,
];

export const schema = {
  types: schemaTypes,
};
