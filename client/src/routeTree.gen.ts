/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as UserIndexImport } from './routes/user/index'
import { Route as MerchantIndexImport } from './routes/merchant/index'
import { Route as UserSignupImport } from './routes/user/signup'
import { Route as UserLoginImport } from './routes/user/login'
import { Route as UserIdImport } from './routes/user/$id'
import { Route as MerchantSignupImport } from './routes/merchant/signup'
import { Route as MerchantLoginImport } from './routes/merchant/login'
import { Route as MerchantIdImport } from './routes/merchant/$id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserIndexRoute = UserIndexImport.update({
  id: '/user/',
  path: '/user/',
  getParentRoute: () => rootRoute,
} as any)

const MerchantIndexRoute = MerchantIndexImport.update({
  id: '/merchant/',
  path: '/merchant/',
  getParentRoute: () => rootRoute,
} as any)

const UserSignupRoute = UserSignupImport.update({
  id: '/user/signup',
  path: '/user/signup',
  getParentRoute: () => rootRoute,
} as any)

const UserLoginRoute = UserLoginImport.update({
  id: '/user/login',
  path: '/user/login',
  getParentRoute: () => rootRoute,
} as any)

const UserIdRoute = UserIdImport.update({
  id: '/user/$id',
  path: '/user/$id',
  getParentRoute: () => rootRoute,
} as any)

const MerchantSignupRoute = MerchantSignupImport.update({
  id: '/merchant/signup',
  path: '/merchant/signup',
  getParentRoute: () => rootRoute,
} as any)

const MerchantLoginRoute = MerchantLoginImport.update({
  id: '/merchant/login',
  path: '/merchant/login',
  getParentRoute: () => rootRoute,
} as any)

const MerchantIdRoute = MerchantIdImport.update({
  id: '/merchant/$id',
  path: '/merchant/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/merchant/$id': {
      id: '/merchant/$id'
      path: '/merchant/$id'
      fullPath: '/merchant/$id'
      preLoaderRoute: typeof MerchantIdImport
      parentRoute: typeof rootRoute
    }
    '/merchant/login': {
      id: '/merchant/login'
      path: '/merchant/login'
      fullPath: '/merchant/login'
      preLoaderRoute: typeof MerchantLoginImport
      parentRoute: typeof rootRoute
    }
    '/merchant/signup': {
      id: '/merchant/signup'
      path: '/merchant/signup'
      fullPath: '/merchant/signup'
      preLoaderRoute: typeof MerchantSignupImport
      parentRoute: typeof rootRoute
    }
    '/user/$id': {
      id: '/user/$id'
      path: '/user/$id'
      fullPath: '/user/$id'
      preLoaderRoute: typeof UserIdImport
      parentRoute: typeof rootRoute
    }
    '/user/login': {
      id: '/user/login'
      path: '/user/login'
      fullPath: '/user/login'
      preLoaderRoute: typeof UserLoginImport
      parentRoute: typeof rootRoute
    }
    '/user/signup': {
      id: '/user/signup'
      path: '/user/signup'
      fullPath: '/user/signup'
      preLoaderRoute: typeof UserSignupImport
      parentRoute: typeof rootRoute
    }
    '/merchant/': {
      id: '/merchant/'
      path: '/merchant'
      fullPath: '/merchant'
      preLoaderRoute: typeof MerchantIndexImport
      parentRoute: typeof rootRoute
    }
    '/user/': {
      id: '/user/'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/merchant/$id': typeof MerchantIdRoute
  '/merchant/login': typeof MerchantLoginRoute
  '/merchant/signup': typeof MerchantSignupRoute
  '/user/$id': typeof UserIdRoute
  '/user/login': typeof UserLoginRoute
  '/user/signup': typeof UserSignupRoute
  '/merchant': typeof MerchantIndexRoute
  '/user': typeof UserIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/merchant/$id': typeof MerchantIdRoute
  '/merchant/login': typeof MerchantLoginRoute
  '/merchant/signup': typeof MerchantSignupRoute
  '/user/$id': typeof UserIdRoute
  '/user/login': typeof UserLoginRoute
  '/user/signup': typeof UserSignupRoute
  '/merchant': typeof MerchantIndexRoute
  '/user': typeof UserIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/merchant/$id': typeof MerchantIdRoute
  '/merchant/login': typeof MerchantLoginRoute
  '/merchant/signup': typeof MerchantSignupRoute
  '/user/$id': typeof UserIdRoute
  '/user/login': typeof UserLoginRoute
  '/user/signup': typeof UserSignupRoute
  '/merchant/': typeof MerchantIndexRoute
  '/user/': typeof UserIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/merchant/$id'
    | '/merchant/login'
    | '/merchant/signup'
    | '/user/$id'
    | '/user/login'
    | '/user/signup'
    | '/merchant'
    | '/user'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/merchant/$id'
    | '/merchant/login'
    | '/merchant/signup'
    | '/user/$id'
    | '/user/login'
    | '/user/signup'
    | '/merchant'
    | '/user'
  id:
    | '__root__'
    | '/'
    | '/merchant/$id'
    | '/merchant/login'
    | '/merchant/signup'
    | '/user/$id'
    | '/user/login'
    | '/user/signup'
    | '/merchant/'
    | '/user/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  MerchantIdRoute: typeof MerchantIdRoute
  MerchantLoginRoute: typeof MerchantLoginRoute
  MerchantSignupRoute: typeof MerchantSignupRoute
  UserIdRoute: typeof UserIdRoute
  UserLoginRoute: typeof UserLoginRoute
  UserSignupRoute: typeof UserSignupRoute
  MerchantIndexRoute: typeof MerchantIndexRoute
  UserIndexRoute: typeof UserIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  MerchantIdRoute: MerchantIdRoute,
  MerchantLoginRoute: MerchantLoginRoute,
  MerchantSignupRoute: MerchantSignupRoute,
  UserIdRoute: UserIdRoute,
  UserLoginRoute: UserLoginRoute,
  UserSignupRoute: UserSignupRoute,
  MerchantIndexRoute: MerchantIndexRoute,
  UserIndexRoute: UserIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/merchant/$id",
        "/merchant/login",
        "/merchant/signup",
        "/user/$id",
        "/user/login",
        "/user/signup",
        "/merchant/",
        "/user/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/merchant/$id": {
      "filePath": "merchant/$id.tsx"
    },
    "/merchant/login": {
      "filePath": "merchant/login.tsx"
    },
    "/merchant/signup": {
      "filePath": "merchant/signup.tsx"
    },
    "/user/$id": {
      "filePath": "user/$id.tsx"
    },
    "/user/login": {
      "filePath": "user/login.tsx"
    },
    "/user/signup": {
      "filePath": "user/signup.tsx"
    },
    "/merchant/": {
      "filePath": "merchant/index.tsx"
    },
    "/user/": {
      "filePath": "user/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
