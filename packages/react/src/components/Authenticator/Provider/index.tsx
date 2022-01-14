import { Hub } from '@aws-amplify/core';
import {
  AuthenticatorMachineOptions,
  createAuthenticatorMachine,
  getServiceFacade,
} from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import * as React from 'react';
import generateContext from 'react-generate-context';

import type { PartialDeep } from '../../../types';
import { defaultComponents } from './defaultComponents';

export type ProviderProps = AuthenticatorMachineOptions & {
  components?: PartialDeep<typeof defaultComponents>;
  services?: AuthenticatorMachineOptions['services'];
};

const useAuthenticatorValue = ({
  components: customComponents,
  initialState,
  loginMechanisms,
  socialProviders,
  signUpAttributes,
  services,
}: ProviderProps) => {
  const [state, send] = useMachine(
    () =>
      createAuthenticatorMachine({
        initialState,
        loginMechanisms,
        services,
        signUpAttributes,
        socialProviders,
      }),
    {
      devTools: process.env.NODE_ENV === 'development',
    }
  );

  React.useEffect(() => {
    // TODO: share this logic from @aws-amplify/ui
    const listener = (data) => {
      if (data.payload.event === 'signOut') {
        console.log('signOut detected, sending SIGN_OUT signal');
        send('SIGN_OUT');
      }
    };
    return Hub.listen('auth', listener);
  }, []);

  const components = React.useMemo(
    () => ({ ...defaultComponents, ...customComponents }),
    [customComponents]
  );

  const facade = React.useMemo(
    () => getServiceFacade({ send, state }),
    [send, state]
  );

  return {
    /** @deprecated For internal use only */
    _send: send,
    /** @deprecated For internal use only */
    _state: state,
    components,
    ...facade,
  };
};

const [Provider, useAuthenticator] = generateContext(useAuthenticatorValue, {
  missingProviderMessage:
    'useAuthenticator is being used outside of an <Provider>',
  requireProvider: true,
});

export { Provider, useAuthenticator };
