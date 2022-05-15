import { Timestamp } from "firebase/firestore";

export default interface user {
    name: string,
    age: string,
    interests: Array<string>,
    status: "Active" | "Blocked" | "Other",
    following: Array<Partial<user>>,
    followers: Array<Partial<user>>,
    createdAt: Timestamp
}