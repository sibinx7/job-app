import { signalStore, withState, withComputed, withMethods, patchState, withHooks } from '@ngrx/signals'
import { inject, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'
import { IUser } from '../interfaces/iUser';
import { RoleLabel } from '../utils/helper';
import { UserRole } from '../../../../../packages/shared/src/enums/user.enum';



type AuthStoreState = {
  token: string;
  user: IUser | null;
}

const initalValue = {
  token: '',
  user: null,
}
function getInitialAuthState(): AuthStoreState {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token') || '';
    const userStr = localStorage.getItem('user');
    let user: IUser | null = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
    return { token, user };
  }
  return { token: '', user: null };
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(getInitialAuthState()),
  withComputed((store) => {
    return {
      isAuthenticated: computed(() => !!store?.token()),
      isAdmin: computed(() => (store.user() as any)?.isAdmin ?? false),
      user: computed(() => store.user()),
      role: computed(() => {
        const role = (store.user() as any)?.role ?? UserRole.JOB_SEEKER;

        return role in RoleLabel
          ? RoleLabel[role as keyof typeof RoleLabel]
          : 'Unknown Role';
      }),
    };
  }),
  withMethods((store) => {
    const platformID = inject(PLATFORM_ID);
    return {
      setToken: (token: string) => {
        if (isPlatformBrowser(platformID)) {
          localStorage.setItem('token', token);
        }
        patchState(store, (state: any) => ({
          ...state,
          token
        }));
      },
      setUser: (user: IUser) => {
        if (isPlatformBrowser(platformID)) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        patchState(store, (state: any) => ({
          ...state,
          user
        }));
      },
      setUserAndToken: (token: string, user: IUser) => {
        if (isPlatformBrowser(platformID)) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
        }
        patchState(store, (state: any) => ({
          ...state,
          token,
          user
        }));
      },
      clearUserAndToken: () => {
        if (isPlatformBrowser(platformID)) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        patchState(store, () => ({ token: '', user: null }));
      },
    };
  }),
  withHooks({
    onInit: (store) => {
      const platformID = inject(PLATFORM_ID);
      const token = isPlatformBrowser(platformID) ? localStorage?.getItem('token') : '';
      const user = isPlatformBrowser(platformID) ? localStorage?.getItem('user') : null;
      if (token) {
        patchState(store, (state) => ({ token }));
      }
      if (user) {
        patchState(store, (state) => ({ user: JSON.parse(user) }));
      }
    },
  }),
);
