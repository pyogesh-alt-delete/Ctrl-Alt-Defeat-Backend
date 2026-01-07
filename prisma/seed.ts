import { PrismaClient } from '@prisma/client';
import {PrismaPg} from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Seeding database...');

    // Create sample users
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@example.com',
            password: 'hashedpassword123', // Will hash this in Issue 5
            username: 'user1',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'user2@example.com',
            password: 'hashedpassword456',
            username: 'user2',
        },
    });

    console.log('✅ Users created:', user1, user2);

    // Create sample problems
    const problem1 = await prisma.problem.create({
        data: {
            title: 'Two Sum',
            description: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.',
            difficulty: 'EASY',
            constraints: '2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9',
            timeLimit: 1000,
            memoryLimit: 256,
            topics: ['array', 'hash-table'],
            acceptanceRate: 47.3,
        },
    });

    const problem2 = await prisma.problem.create({
        data: {
            title: 'Reverse String',
            description: 'Write a function that reverses a string.',
            difficulty: 'EASY',
            constraints: '1 <= s.length <= 10^5',
            timeLimit: 1000,
            memoryLimit: 256,
            topics: ['string', 'two-pointers'],
            acceptanceRate: 79.2,
        },
    });

    console.log('✅ Problems created:', problem1, problem2);
    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });