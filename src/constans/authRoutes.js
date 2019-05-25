import React from 'react'
import { routes } from "./tabs-routes";

export const authRoutes = []

export function createAuthRoutes(routes, authUser){
    routes.map((route) => {
        if(route.visible && route.access.includes(authUser.role)){
            authRoutes.push(route)
        }
    })
}




