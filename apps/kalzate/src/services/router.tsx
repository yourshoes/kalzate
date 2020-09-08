import { lazy } from 'react';

const getPath = (...path) => `/${path.join('/')}`;

export const HOME_PAGE = 'kz.pages.home';
export const MATCH_PAGE = 'ai.pages.match';
export const SETTINGS_PAGE = 'ai.pages.settings';
export const JOIN_PAGE = 'ai.pages.join';
export const JOIN_PROFILE_PAGE = 'ai.pages.joinProfile';
export const LOGIN_PAGE = 'ai.pages.login';
export const AUTH_ACTIONS_PAGE = 'ai.pages.authActions';
export const PASSWORD_RESET_PAGE = 'ai.pages.resetPassword';
export const NOT_FOUND_PAGE = 'ai.pages.notFound';

class RouterService {
  routes = [
    {
      id: HOME_PAGE,
      path: getPath(),
      component: lazy(() => import('/pages/Home')),
      exact: true,
    },
    // {
    //   id: MATCH_PAGE,
    //   path: getPath('match'),
    //   component: lazy(() => import('pages/Match')),
    //   exact: true,
    //   private: true,
    // },
    // {
    //   id: SETTINGS_PAGE,
    //   path: getPath('settings'),
    //   component: lazy(() => import('pages/Settings')),
    //   exact: true,
    //   private: true,
    // },
    // {
    //   id: JOIN_PAGE,
    //   path: getPath('join'),
    //   component: lazy(() => import('pages/Join')),
    //   exact: true,
    //   redirectWhenLoggedIn: true
    // },
    // {
    //   id: AUTH_ACTIONS_PAGE,
    //   path: getPath('auth','action'),
    //   component: lazy(() => import('pages/AuthActions')),
    //   exact: true,
    // },
    // {
    //   id: JOIN_PROFILE_PAGE,
    //   path: getPath('join', 'profile'),
    //   component: lazy(() => import('pages/JoinProfile')),
    //   exact: true,
    //   private: true
    // },
    // {
    //   id: LOGIN_PAGE,
    //   path: getPath('login'),
    //   component: lazy(() => import('pages/Login')),
    //   exact: true,
    //   redirectWhenLoggedIn: true
    // },
    // {
    //   id: PASSWORD_RESET_PAGE,
    //   path: getPath('reset', 'password'),
    //   component: lazy(() => import('pages/PasswordReset')),
    //   exact: true,
    //   redirectWhenLoggedIn: true
    // },
    // {
    //   id: NOT_FOUND_PAGE,
    //   path: '*',
    //   component: lazy(() => import('pages/NotFound')),
    // },
  ];

  reload() {
    window.location.reload();
  }

  find(routeId) {
    return this.routes.find(({ id }) => id === routeId).path;
  }
}

export default new RouterService();
