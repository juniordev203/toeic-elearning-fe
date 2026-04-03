import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    // URL to your backend's OpenAPI/Swagger spec (ensure the backend is running)
    input: 'http://localhost:3001/api/docs-json',
    output: {
      mode: 'tags-split', // Groups endpoints by tags like Auth, Lessons, etc.
      workspace: 'src/api/generated',
      target: 'api.ts', // Sub-folder/file where the api calls will be output
      schemas: 'model', // Sub-folder where DTO and Response types will go
      clean: true, // Clean output folder before generating
      override: {
        mutator: {
          path: '../axios-instance.ts',
          name: 'customAxiosInstance',
        },
      },
    },
  },
});
