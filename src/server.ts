import app from './app';
import 'reflect-metadata';
import './database';

app.listen(3333, () => {
    console.log('🚀 server started on port 3333...');
});
