const mongoose = require('mongoose');

// ⚠️ Reemplaza la contraseña con la real si cambia
const mongoURI = "mongodb://root:1Gw6PpzvNAr5H23IL0Yx1yJ0@172.21.157.238:27017";

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {
        await mongoose.connect(mongoURI, {
            dbName: 'stayhealthybeta1', // Asegúrate de que este sea el nombre de tu base de datos
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.info('✅ Connected to MongoDB Successfully');
        return;
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message);

        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('❌ Unable to connect to MongoDB after multiple retries!');
        }

        console.info(`🔄 Retrying connection... Attempt ${nextRetryCount}`);

        return await connectToMongo(nextRetryCount);
    }
};

module.exports = connectToMongo;
