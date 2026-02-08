import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

export const seedAdmin = async () => {
    try {
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminUsername || !adminPassword) {
            console.error('❌ Admin credentials (ADMIN_USERNAME, ADMIN_PASSWORD) not found in .env');
            return;
        }

        const existingAdmin = await User.findOne({ username: adminUsername });

        if (existingAdmin) {
            console.log('✅ Admin user already exists. Updating password to match .env...');
            existingAdmin.password = adminPassword;
            await existingAdmin.save(); // Triggers pre-save hook to hash password
            console.log('✅ Admin password updated successfully');
            return;
        }

        console.log('Creating new admin user...');
        const admin = new User({
            username: adminUsername,
            password: adminPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('✅ Admin user created successfully');
    } catch (error) {
        console.error('❌ Error seeding admin user:', error);
    }
};
