const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

async function listModels() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY no está configurada en .env.local');
      return;
    }

    console.log('🔑 API Key encontrada, probando modelos disponibles...\n');

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Lista de modelos a probar
    const modelsToTest = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-2.5-flash',
      'gemini-2.5-pro',
      'gemini-1.0-pro',
      'gemini-1.0-pro-latest',
      'gemini-1.5-pro-latest',
      'gemini-1.5-flash-latest'
    ];
    
    console.log('🧪 Probando modelos:\n');
    console.log('='.repeat(70));
    
    const workingModels = [];
    
    for (const modelName of modelsToTest) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        // Intentar una llamada simple para verificar
        const result = await model.generateContent('Say "test"');
        const response = await result.response;
        const text = response.text();
        
        console.log(`✅ ${modelName.padEnd(30)} - FUNCIONA ✓`);
        workingModels.push(modelName);
      } catch (error) {
        const errorMsg = error.message.split('\n')[0].substring(0, 40);
        console.log(`❌ ${modelName.padEnd(30)} - ERROR: ${errorMsg}...`);
      }
    }
    
    console.log('='.repeat(70));
    
    if (workingModels.length > 0) {
      console.log(`\n✅ Modelos que funcionan (${workingModels.length}):\n`);
      workingModels.forEach(model => {
        console.log(`   • ${model}`);
      });
      console.log(`\n💡 Recomendación: Usa "${workingModels[0]}" en tu código\n`);
    } else {
      console.log('\n❌ Ningún modelo funcionó. Verifica tu API key.\n');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
  }
}

listModels();

