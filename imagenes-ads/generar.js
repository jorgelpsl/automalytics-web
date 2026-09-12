import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';
import OpenAI from 'openai';

// Uso:
//   node generar.js            -> genera los 5 creativos
//   node generar.js w1         -> genera solo el creativo con id "w1"

const __dirname = dirname(fileURLToPath(import.meta.url));
const SALIDA_DIR = join(__dirname, 'salidas');
const prompts = JSON.parse(readFileSync(join(__dirname, 'prompts.json'), 'utf8'));

if (!process.env.OPENAI_API_KEY) {
  console.error('Falta OPENAI_API_KEY en .env (copia .env.example y complétalo)');
  process.exit(1);
}

const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const client = new OpenAI();

const filtro = process.argv[2];
const aGenerar = filtro ? prompts.filter((p) => p.id === filtro) : prompts;

if (aGenerar.length === 0) {
  console.error(`No hay creativos que coincidan con "${filtro}". Revisa prompts.json.`);
  process.exit(1);
}

if (!existsSync(SALIDA_DIR)) mkdirSync(SALIDA_DIR);

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

for (const creativo of aGenerar) {
  console.log(`Generando ${creativo.id} (${creativo.negocio} / ${creativo.titulo})...`);
  try {
    const res = await client.images.generate({
      model: MODEL,
      prompt: creativo.prompt,
      size: creativo.orientacion === 'vertical' ? '1024x1536' : '1024x1024',
      quality: 'medium',
    });
    const b64 = res.data[0].b64_json;
    const archivo = join(SALIDA_DIR, `${creativo.id}-${slug(creativo.titulo)}.png`);
    writeFileSync(archivo, Buffer.from(b64, 'base64'));
    console.log(`  -> ${archivo}`);
  } catch (err) {
    console.error(`  FALLÓ ${creativo.id}:`, err.message);
  }
}

console.log(`\nListo. Revisa la carpeta salidas/`);
