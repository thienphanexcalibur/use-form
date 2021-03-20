import { useRef, useCallback } from "react";

import { useCallback } from 'react';
export default function useForm() {
  const _internalRegister = useRef({});

  const register = useCallback((node) => {
    Object.assign(_internalRegister.current, {
      [node.name]: node
    });
  }, []);

  const reset = useCallback(() => {
    for (const node in _internalRegister.current) {
      _internalRegister.current[node].value = "";
    }
  }, []);

  const handleSubmit = useCallback((callback) => {
    return (e) => {
      e.preventDefault();
      const data = Object.fromEntries(
        Object.entries(_internalRegister.current).map(([key, node]) => [
          key,
          node.value
        ])
      );
      callback(data);
    };
  }, []);

  return {
    register,
    handleSubmit,
    reset
  };
}
