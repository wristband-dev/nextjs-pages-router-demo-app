import React from 'react';

type Props = { isLoading: boolean; clicked: (...args: unknown[]) => void };

export function TestHelloButton({ isLoading = false, clicked = () => {} }: Props) {
  return (
    <button
      onClick={clicked}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {isLoading ? 'Saying Hello...' : 'Say Hello'}
    </button>
  );
}
