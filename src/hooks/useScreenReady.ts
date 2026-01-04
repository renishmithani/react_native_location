import { useState, useEffect } from 'react';
import { InteractionManager } from 'react-native';

export const useScreenReady = (): boolean => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Screen is focused → wait for interactions
    InteractionManager.runAfterInteractions(() => {
      if (!cancelled) {
        setIsReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return isReady;
};
