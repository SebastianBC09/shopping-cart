'use client';

import { Button } from './Button';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  variant === 'danger'
                    ? 'bg-error-100'
                    : variant === 'warning'
                    ? 'bg-warning-100'
                    : 'bg-info-100'
                }`}
              >
                <AlertTriangle
                  className={`h-6 w-6 ${
                    variant === 'danger'
                      ? 'text-error-600'
                      : variant === 'warning'
                      ? 'text-warning-600'
                      : 'text-info-600'
                  }`}
                  strokeWidth={2.5}
                />
              </div>
              <h2
                id="dialog-title"
                className="text-xl font-bold text-gray-900"
              >
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <p className="text-base text-gray-600 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 px-6 pb-6">
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
              disabled={isLoading}
              fullWidth
            >
              {cancelText}
            </Button>
            <Button
              variant={variant === 'danger' ? 'danger' : 'primary'}
              size="lg"
              onClick={handleConfirm}
              disabled={isLoading}
              isLoading={isLoading}
              fullWidth
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
