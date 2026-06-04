import { defineField, defineType } from 'sanity';

export const profileType = defineType({
  name: 'profile',
  title: 'Profile Control Panel',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Professional Biography / Hook',
      type: 'text',
    }),
    defineField({
      name: 'certificateFile',
      title: 'Professional Certificate (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
  ],
});
