import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import './index.css';

export interface NoteAppProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

export default function NoteApp({ title, content, onClose }: NoteAppProps) {
  return (
    <div className="window">
      <div className="window-header">
        <p className="window-title">{title}</p>
        <div className="window-x" onClick={onClose}>
          <FontAwesomeIcon icon={faX} className="window-x-icon" />
        </div>
      </div>
      <div className="text-content">{content}</div>
    </div>
  );
}