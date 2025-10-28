import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'greenscout',

  projectId: 'cew8k4ec',
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool(),
    media()
  ],

  schema: {
    types: schemaTypes,
  },
})
