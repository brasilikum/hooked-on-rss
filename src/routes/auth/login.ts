import stringHash from "string-hash"
import * as cookie from "cookie"
import {v4 as uuidv4} from "uuid"
import DB from "better-sqlite3-helper"

export async function post({body}) {
    const {email, password} = body
}