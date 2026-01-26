import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import ContentFile, { FileProps } from './ContentFile.tsx';

export interface FileAppProps {
  title: string;
  content: FileProps[];
  onClose: () => void;
}

export default function FileApp({ title, content, onClose }: FileAppProps) {

  const files = content.map(file =>
    <ContentFile
      title={file.title}
      image={file.image}
      detail={file.detail}
      handleClick={file.handleClick}
    />
  )

  return (
    <div className="window">
      <div className="window-header">
        <p className="window-title">{title}</p>
        <div className="window-x" onClick={onClose}>
          <FontAwesomeIcon icon={faX} className="window-x-icon" />
        </div>
      </div>
      <div className="file-list">
        {files}
      </div>
    </div>
  );
}