import { createContext, useContext } from 'react';

const FormPathContext = createContext('');

export const FormPathProvider = FormPathContext.Provider;

export function useFormPath(): string {
  return useContext(FormPathContext);
}

export function joinFormPath(...segments: string[]): string {
  return segments.filter(Boolean).join('.');
}

export function scopeToName(scope: string): string {
  return scope
    .replace(/^#\/?/, '')
    .split('/')
    .filter((segment) => segment !== '' && segment !== 'properties')
    .join('.');
}

export function useFieldName(scope: string): string {
  return joinFormPath(useFormPath(), scopeToName(scope));
}
