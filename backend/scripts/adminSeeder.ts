import User from "../models/User";

export const seedAdmin = async (): Promise<void> => {
    try {
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminUsername || !adminPassword) {
            console.warn("Admin seeding skipped: ADMIN_USERNAME or ADMIN_PASSWORD is missing");
            return;
        }

        const existingAdmin = await User.findOne({ username: adminUsername });
        if (existingAdmin) {
            existingAdmin.password = adminPassword;
            await existingAdmin.save();
            console.log("Admin password synced from environment");
            return;
        }

        await User.create({
            username: adminUsername,
            password: adminPassword,
            role: "admin",
        });

        console.log(`Admin user created: ${adminUsername}`);
    } catch (error) {
        console.error("Admin seed failed:", error);
    }
};
