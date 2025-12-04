import { User as AuthUser } from "lucia";

type Entity = {
    userId: string | null;
}

type isOwnerParams = {
    user : AuthUser | null | undefined,
    entity: Entity | null | undefined
}

export const isOwner = ({user: authUser, entity}: isOwnerParams) => {
    if (!authUser || !entity) return false
    
    if (!entity.userId) return false
    
    if (entity.userId !== authUser.id) {
        return false
    } else {
        return true
    }
}