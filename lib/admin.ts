import { auth } from "@clerk/nextjs/server"


const adminIds =[
    "user_2neb0Un5nl2jB8VKFZKjIV2ePQw"
];
export const IsAdmin = async () =>{
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
};