import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'optimized');

// Image optimization settings
const OPTIMIZATION_SETTINGS = {
  webp: {
    quality: 80,
    effort: 6,
  },
  avif: {
    quality: 80,
    effort: 6,
  },
  jpeg: {
    quality: 85,
    progressive: true,
  },
  png: {
    compressionLevel: 9,
  },
};

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputPath, format) {
  try {
    let pipeline = sharp(inputPath);

    switch (format) {
      case 'webp':
        await pipeline
          .webp(OPTIMIZATION_SETTINGS.webp)
          .toFile(outputPath);
        break;
      case 'avif':
        await pipeline
          .avif(OPTIMIZATION_SETTINGS.avif)
          .toFile(outputPath);
        break;
      case 'jpeg':
        await pipeline
          .jpeg(OPTIMIZATION_SETTINGS.jpeg)
          .toFile(outputPath);
        break;
      case 'png':
        await pipeline
          .png(OPTIMIZATION_SETTINGS.png)
          .toFile(outputPath);
        break;
      default:
        console.warn(`Unknown format: ${format}`);
        return;
    }

    const originalSize = (await fs.stat(inputPath)).size;
    const optimizedSize = (await fs.stat(outputPath)).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);

    console.log(`✓ ${path.basename(inputPath)} → ${format.toUpperCase()}: ${savings}% smaller`);
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
  }
}

async function getImageFiles(dir) {
  const files = await fs.readdir(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);
  });
}

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  try {
    // Ensure output directory exists
    await ensureDirectoryExists(OUTPUT_DIR);

    // Get all image files
    const imageFiles = await getImageFiles(IMAGES_DIR);

    if (imageFiles.length === 0) {
      console.log('No images found to optimize.');
      return;
    }

    console.log(`Found ${imageFiles.length} images to optimize:\n`);

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(IMAGES_DIR, file);
      const ext = path.extname(file).toLowerCase();
      const nameWithoutExt = path.basename(file, ext);

      // Create WebP version
      const webpPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.webp`);
      await optimizeImage(inputPath, webpPath, 'webp');

      // Create AVIF version
      const avifPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.avif`);
      await optimizeImage(inputPath, avifPath, 'avif');

      // Optimize original format
      const optimizedOriginalPath = path.join(OUTPUT_DIR, file);
      if (ext === '.jpg' || ext === '.jpeg') {
        await optimizeImage(inputPath, optimizedOriginalPath, 'jpeg');
      } else if (ext === '.png') {
        await optimizeImage(inputPath, optimizedOriginalPath, 'png');
      }
    }

    console.log('\n✅ Image optimization completed!');
    console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
    console.log('\n💡 Next steps:');
    console.log('1. Update your image references to use the optimized versions');
    console.log('2. Consider using <picture> elements for WebP/AVIF support');
    console.log('3. Implement lazy loading for better performance');

  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

// Run the optimization
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeImages();
}

export { optimizeImages };
