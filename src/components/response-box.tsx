import React from 'react';

export function ResponseBox({ title = 'Response:', message = '' }: { title?: string; message: string }) {
  return (
    <div className="mt-4 rounded border border-gray-300 dark:border-gray-700">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 border-b border-gray-300 dark:border-gray-700">
        <p className="font-bold text-sm text-center">{title}</p>
      </div>
      <div className="p-2 max-h-60 overflow-auto">
        <pre className="text-xs whitespace-pre-wrap break-all">{message}</pre>
      </div>
    </div>
  );
}
