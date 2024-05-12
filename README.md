# Meme Generator API Client

This TypeScript library provides a simple and efficient way to interact with the [Meme Generator API](https://api.memegen.link/docs/), allowing you to easily fetch meme templates, create memes with custom text, and retrieve font information programmatically.

## Features

- Fetch all available meme templates.
- Retrieve information about a specific template.
- Generate memes with custom text.
- List all supported fonts and get details about a specific font.

## Installation

```bash
npm install memegen-wrapper
```

## Usage

### Initialize the API client

```typescript
import MemeGeneratorAPI from 'memegen-wrapper';

const apiKey = 'your-api-key'; // Optional
const api = new MemeGeneratorAPI(apiKey);
```

### Fetch all available meme templates

```typescript
const templates = await api.getTemplates();
console.log(templates);
```

### Generate a Meme

```typescript
const meme = await api.generateMeme('template-id', {
  text: ['Text 1', 'Text 2'],
});
console.log(meme);
```

### API Documentation

For more information on the available methods and their parameters, please refer to the [API documentation](https://api.memegen.link/docs/).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any improvements or bug fixes to suggest.
