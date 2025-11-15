# 🚀 Guía de Deploy a Vercel

## Paso 1: Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. Nombre sugerido: `jobgether-prototype`
3. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
4. Copia la URL del repositorio (ej: `https://github.com/tu-usuario/jobgether-prototype.git`)

## Paso 2: Conectar con GitHub

Ejecuta estos comandos en la terminal (reemplaza `TU-URL-DEL-REPO` con la URL que copiaste):

```bash
cd /Users/juanrestrepotoro/Documents/jobgether
git remote add origin TU-URL-DEL-REPO
git push -u origin main
```

## Paso 3: Deploy en Vercel

### Opción A: Desde la web de Vercel (Recomendado)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Click en "Add New Project"
3. Selecciona el repositorio `jobgether-prototype`
4. Vercel detectará automáticamente Next.js
5. Click en "Deploy"
6. ¡Listo! Tu app estará disponible en unos minutos

### Opción B: Desde la CLI

```bash
npm i -g vercel
vercel
```

Sigue las instrucciones en la terminal.

## Configuración automática

Vercel detectará automáticamente:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

## Variables de entorno

Por ahora no necesitas variables de entorno ya que todo es frontend-only.

## URLs

Después del deploy, tendrás:
- **Production**: `https://tu-proyecto.vercel.app`
- **Preview**: Cada push a una rama crea un preview automático

## Actualizaciones futuras

Cada vez que hagas `git push` a la rama `main`, Vercel desplegará automáticamente.

