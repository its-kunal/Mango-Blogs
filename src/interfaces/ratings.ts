import { Timestamp } from "firebase/firestore";
import user from "./user";

export default interface ratings {
    value: number,
    emoji: "❤" | "👍" | "👎" | "😀" | "👏" | "😡",
    description: string,
    author: user,
    createdAt: Timestamp
}