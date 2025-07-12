'use client';

import { useToast } from '@/hooks/use-toast';
import { Toaster as CustomToaster } from '@/components/ui/toast'; // Import your own Toaster

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return <CustomToaster toasts={toasts} onDismiss={dismiss} />;
}
