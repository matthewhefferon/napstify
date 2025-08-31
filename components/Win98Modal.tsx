'use client';

import React from 'react';

interface Win98ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function Win98Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel'
}: Win98ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="win98-modal">
        {/* Title Bar */}
        <div className="win98-modal-titlebar">
          <span className="text-sm font-bold">{title}</span>
          <button
            onClick={onClose}
            className="win98-control close"
            title="Close"
          />
        </div>
        
        {/* Content */}
        <div className="win98-modal-content">
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="win98-modal-icon">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="#ffd400" stroke="#000" strokeWidth="1"/>
                <path d="M12 10 L20 16 L12 22 Z" fill="#000"/>
              </svg>
            </div>
            
            {/* Message */}
            <div className="flex-1">
              <p className="text-sm leading-relaxed">{message}</p>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="win98-modal-buttons">
            <button
              onClick={onConfirm}
              className="btn-98"
              style={{ minWidth: '75px' }}
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="btn-98"
              style={{ minWidth: '75px' }}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
