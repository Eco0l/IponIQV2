import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db= drizzle (sql , {schema});

const main = async () =>{
    try {
        console.log("Seeding Database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Invesments: Basics",
                imageSrc: "/IB.svg",
            },
            {
                id: 2,
                title: "Investments: Importance",
                imageSrc: "/IIB.svg",
            },
            {
                id: 3,
                title: "Invesments: Increasing Income",
                imageSrc: "/IINC.svg",
            },
        ]);

    await db.insert(schema.units).values([
        {
            id: 1,
            courseId:1,
            title:"Unit 1",
            description: "Learn Basics of Investments",
            order: 1,
        }
    ]);

    await db.insert(schema.lessons).values([
        {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Basics",
        },
        {
            id: 2,
            unitId: 1,
            order: 2,
            title: "Basics 2",
            },

        {
            id: 3,
            unitId: 1,
            order: 3,
            title: "Basics 3",
            },
        {
            id: 4,
            unitId: 1,
            order: 4,
            title: "Basics 4",
            },
        {
            id: 5,
            unitId: 1,
            order: 5,
            title: "Basics 5",
            },
    
    ]);

    await db.insert(schema.challenges).values ([
        {
            id: 1,
            lessonId: 1,
            type: "SELECT",
            order: 1 ,
            question: 'Question "Sample" ',
        },
        

    ]);

    await db.insert (schema.challengeOptions).values ([
        {
            id: 1,
            challengeId: 1,// Question Sample
            imageSrc: "/ans.svg",
            correct: true,
            text: "Answer",
        },
        {
            id: 2,
            challengeId: 1,
            imageSrc: "/wr.svg",
            correct: false,
            text: "Wrong",
        },
        {
            id: 3,
            challengeId: 1,
            imageSrc: "/wr2.svg",
            correct: false,
            text: "Wrong",
        }
    ])
        console.log("Seeding Finished");
    } catch(error) {
        console.error(error);
        throw new Error ("failed to seed the database");
    }
};

main();