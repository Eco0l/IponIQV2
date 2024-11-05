import { auth } from "@clerk/nextjs/server"


const adminIds =[
    "user_2nw9FM0VtK0bHYXUxNNOnREavIb",
];
export const IsAdmin = async () =>{
    const { userId } = auth();

    if (!userId) {
        
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
};