
import React from 'react';

const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-white/5 rounded ${className}`}></div>
);

export const TableRowSkeleton = ({ columns = 5 }) => (
  <div className="flex w-full space-x-4 py-4">
    {Array(columns).fill(0).map((_, i) => (
      <Skeleton key={i} className={`h-8 ${i === 0 ? 'w-12' : 'flex-1'}`} />
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-12 w-full" />
    <div className="flex space-x-2">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-16" />
    </div>
  </div>
);

export const FormFieldSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-10 w-full" />
  </div>
);

export const FormSkeleton = ({ fields = 4 }) => (
  <div className="space-y-6">
    {Array(fields).fill(0).map((_, i) => (
      <FormFieldSkeleton key={i} />
    ))}
    <Skeleton className="h-10 w-32 mt-4" />
  </div>
);

export default { TableRowSkeleton, CardSkeleton, FormSkeleton, FormFieldSkeleton };
