import { signalStore, withState, withComputed, withMethods, patchState, withHooks } from '@ngrx/signals'
import { inject, PLATFORM_ID, computed} from '@angular/core';
import { isPlatformBrowser } from '@angular/common'
import { IUser } from '../interfaces/iUser';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState({
    token: '' as string,
    user: null as IUser | null,
  }),
  withComputed((store) => {
    return {
      isAuthenticated: computed(() => store?.token),
      isAdmin: computed(() => (store.user as any)?.isAdmin ?? false),
      user: computed(() => store.user),
      role: computed(() => (store.user as any)?.role ?? ''),
    };
  }),
  withMethods((store) => {
    const platformID = inject(PLATFORM_ID);
    return {
      setToken: (token: string) => {
        if(isPlatformBrowser(platformID)){
          localStorage.setItem('token', token);
        }
        patchState(store, (state) => ({ token }));
      },
      setUser: (user: IUser) => {
        if(isPlatformBrowser(platformID)){
          localStorage.setItem('user', JSON.stringify(user));
        }
        patchState(store, (state) => ({ user }));
      },
      clearUserAndToken: () => {
        if(isPlatformBrowser(platformID)){
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        patchState(store, (state) => ({ token: '', user: null }));
      }
    }
  }),
  withHooks({
    onInit: (store) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if(token){
        patchState(store, (state) => ({ token }));
      }
      if(user){
        patchState(store, (state) => ({ user: JSON.parse(user) }));
      }
    }
  })
);
