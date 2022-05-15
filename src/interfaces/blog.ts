import { Timestamp } from "firebase/firestore"
import ratings from "./ratings"
import user from "./user"

export default interface Blog {
    title: string,
    tags: Array<string>,
    description: string,
    author: user,
    blog: string,
    dateCreated: Timestamp,
    lastModified: Timestamp,
    status: "Active" | "Draft" | "Blocked" | "Under Review",
    ratings: Array<ratings>,
    views: Number
}