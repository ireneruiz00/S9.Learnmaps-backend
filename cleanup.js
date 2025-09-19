// cleanup.js
const mongoose = require('mongoose');
require('dotenv').config();

async function cleanup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a:', mongoose.connection.name);
    
    // Eliminar índice si existe
    try {
      await mongoose.connection.db.collection('users').dropIndex('email_1');
      console.log('✅ Índice email_1 eliminado');
    } catch (err) {
      console.log('ℹ️ Índice email_1 no existía o ya fue eliminado');
    }
    
    // Eliminar documentos con email null
    const result = await mongoose.connection.db.collection('users').deleteMany({email: null});
    console.log(`✅ ${result.deletedCount} documentos con email null eliminados`);
    
    // Eliminar campo email de todos los documentos
    const updateResult = await mongoose.connection.db.collection('users').updateMany({}, {$unset: {email: ""}});
    console.log(`✅ Campo email eliminado de ${updateResult.modifiedCount} documentos`);
    
    console.log('🎉 Limpieza completada');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanup();