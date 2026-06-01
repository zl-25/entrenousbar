const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

async function processImages() {
  console.log('Début de la compression des images...');
  const files = fs.readdirSync(publicDir);
  
  let totalSaved = 0;
  
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const filePath = path.join(publicDir, file);
      const statsBefore = fs.statSync(filePath);
      
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      
      // On va écraser les fichiers avec la version optimisée (WebP) 
      // ou redimensionner le fichier d'origine et le remplacer.
      // Mais pour que Vite fonctionne sans changer tout le code source
      // On va juste compresser l'image et l'écraser sous le même nom (ou générer un webp qu'on appelle par défaut)
      // En fait le plus simple est de juste redimensionner et réduire la qualité pour garder la même extension 
      // (sinon il faut changer tous les chemins dans le code).
      
      try {
        const image = sharp(filePath);
        const metadata = await image.metadata();
        
        let width = metadata.width;
        // Limiter la taille max (les affiches ont souvent trop de pixels)
        if (width > 1200) width = 1200;
        
        const tempPath = path.join(publicDir, `temp_${file}`);
        
        if (file.endsWith('.png')) {
          await image
            .resize(width)
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(tempPath);
        } else {
          await image
            .resize(width)
            .jpeg({ quality: 75, progressive: true })
            .toFile(tempPath);
        }
        
        const statsAfter = fs.statSync(tempPath);
        
        // Remplacer l'ancien fichier
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        
        const saved = statsBefore.size - statsAfter.size;
        totalSaved += saved;
        
        console.log(`✅ ${file}: ${(statsBefore.size / 1024 / 1024).toFixed(2)} MB -> ${(statsAfter.size / 1024 / 1024).toFixed(2)} MB (-${(saved / 1024 / 1024).toFixed(2)} MB)`);
      } catch (err) {
        console.error(`❌ Erreur sur ${file}:`, err.message);
      }
    }
  }
  
  console.log(`\n🎉 Terminé ! Total économisé: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

processImages();
