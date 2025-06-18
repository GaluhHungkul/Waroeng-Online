import { TypeHistoryShopping } from "./history_shopping"

export interface TypeUser {
    id? : string | null
    username? : string | null
    password? : string | null
    role? : string | null
    isMember? : boolean | null
    email? : string | null
    historyShopping? : TypeHistoryShopping
}