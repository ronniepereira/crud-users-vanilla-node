import { User, UserSession, UserCreate } from "../../types/UserTypes"

export default interface UserRepository {
    create(user: UserCreate): Promise<void>
    findByEmail(email: string): Promise<User | null>
    list(): Promise<UserSession[]>
    remove(id: string): Promise<void>
}