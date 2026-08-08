import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiInformationCircle } from 'react-icons/hi';

const ToastContext = createContext(null);

const ICONS = {
  success: HiCheckCircle,
  error: HiXCircle,
  info: HiInformationCircle,
};

const ACCENTS = {
  success: 'border-emerald-400/40 text-emerald-300',
  error: 'border-rose-400/40 text-rose-300',
  info: 'border-signal-cyan/40 text-signal-cyan',
};

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, variant = 'info', duration = 3800) => {
      const id = ++idCounter;
      setToasts((current) => [...current, { id, message, variant }]);
      window.setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-5 right-5 z-[100] flex w-[min(360px,calc(100vw-2.5rem))] flex-col gap-3"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = ICONS[toast.variant] ?? HiInformationCircle;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={`glass-panel flex items-start gap-3 rounded-2xl border px-4 py-3.5 ${ACCENTS[toast.variant]}`}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm font-medium text-slate-100">{toast.message}</p>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="ml-auto text-slate-500 hover:text-slate-300"
                  aria-label="Dismiss notification"
                >
                  ×
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
