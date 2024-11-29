import { auth } from "@clerk/nextjs/server"


const adminIds =[
    "user_2nw9FM0VtK0bHYXUxNNOnREavIb", "user_2pWp7hU72McnLHxMZr6oVVa7khC", "user_2o3hRKWlc6VltW1GXLHHfgf6Gdo", "user_2nzt56F5Z7I5wxVcay6RkZxlxfH"
];
export const IsAdmin = async () =>{
    const { userId } = auth();

    if (!userId) {
        
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
};