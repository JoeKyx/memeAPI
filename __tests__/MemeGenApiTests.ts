import axios from 'axios';
import MemeGeneratorAPI from '../src/MemeGenApi';
import { CreateMemeParams } from '../src/types/memeTypes';

describe('MemeGeneratorAPI', () => {
  let api: MemeGeneratorAPI;

  beforeAll(() => {
    api = new MemeGeneratorAPI();
  });

  it('should get a template by ID', async () => {
    const templateId = 'aag'; // Replace with a known template ID
    const template = await api.getTemplate(templateId);
    expect(template).toHaveProperty('id');
    expect(template).toHaveProperty('name');
    expect(template).toHaveProperty('lines');
    expect(template).toHaveProperty('overlays');
    expect(template).toHaveProperty('styles');
    expect(template).toHaveProperty('blank');
    expect(template).toHaveProperty('example');
    expect(template).toHaveProperty('source');
    expect(template.id).toBe(templateId);
  });

  it('should throw an error when getting a template with an invalid ID', async () => {
    const invalidTemplateId = 'invalid-template-id';
    await expect(api.getTemplate(invalidTemplateId)).rejects.toThrow();
  });

  it('should get a list of templates', async () => {
    const templates = await api.getTemplates();
    expect(templates).toBeInstanceOf(Array);
    expect(templates).not.toHaveLength(0);
    // expect each template to have the expected properties
    templates.forEach(template => {
      expect(template).toHaveProperty('id');
      expect(template).toHaveProperty('name');
      expect(template).toHaveProperty('lines');
      expect(template).toHaveProperty('overlays');
      expect(template).toHaveProperty('styles');
      expect(template).toHaveProperty('blank');
      expect(template).toHaveProperty('example');
      expect(template).toHaveProperty('source');
    });
  });

  it('should only get animated templates', async () => {
    const templates = await api.getTemplates({ animated: true });
    expect(templates).toBeInstanceOf(Array);
    expect(templates).not.toHaveLength(0);
    // expect each template to have the expected properties
    templates.forEach(template => {
      expect(template.styles).toContain('animated');
    });
  });

  it('should generate a meme', async () => {
    const templateId = 'aag'; // Replace with a known template ID
    const params: CreateMemeParams = {
      text: ['Hello', 'World'],
    };
    const response = await api.generateMeme(templateId, params);
    expect(response).toHaveProperty('url');
    console.log(response.url);
    // open url and check if it is a valid image

    const headResponse = await axios.head(response.url);
    expect(headResponse.headers['content-type']).toMatch(/^image\//);
  });

  it('should generate an animated meme', async () => {
    const templateId = 'bongo'; // Replace with a known animated template ID
    const params: CreateMemeParams = {
      text: ['Hello', 'World'],
      style: ['animated'],
    };
    const response = await api.generateMeme(templateId, params);
    expect(response).toHaveProperty('url');
    console.log(response.url);
    // open url and check if it is a  webp
    const headResponse = await axios.head(response.url);
    expect(headResponse.headers['content-type']).toBe('image/webp');
  });

  it('should give a list of available fonts', async () => {
    const fonts = await api.getFonts();
    expect(fonts).toBeInstanceOf(Array);
    expect(fonts).not.toHaveLength(0);
    // expect each font to have the expected properties
    fonts.forEach(font => {
      expect(font).toHaveProperty('id');
      expect(font).toHaveProperty('alias');
      expect(font).toHaveProperty('filename');
      expect(font).toHaveProperty('_self');
    });
  });

  it('should get a font by ID', async () => {
    const fontId = 'impact'; // Replace with a known font ID
    const font = await api.getFont(fontId);
    expect(font).toHaveProperty('id');
    expect(font).toHaveProperty('alias');
    expect(font).toHaveProperty('filename');
    expect(font).toHaveProperty('_self');
    expect(font.id).toBe(fontId);
  });
});
