import React from 'react';
import { Call } from '../../types';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { formatTime } from '../../utils';

interface CallTranscriptProps {
  transcript: Call['transcriptObject'];
}

const CallTranscript: React.FC<CallTranscriptProps> = ({ transcript }) => {
  return (
    <ScrollArea className="no-scrollbar h-full">
      <div className="space-y-6 px-4 py-6">
        {transcript?.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${message.role === 'agent' ? 'items-end' : 'items-start'} space-y-1`}
          >
            <div className="flex items-center gap-2 px-4">
              <span
                className={`text-xs font-medium ${
                  message.role === 'agent'
                    ? 'text-sky-400 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {message.role === 'agent' ? 'Agent' : 'User'}
              </span>
              <span className="text-xs text-muted-foreground/60">
                {formatTime(message.words[0]?.start || 0)}
              </span>
            </div>
            <div
              className={`relative max-w-[80%] rounded-xl px-4 py-3 ${
                message.role === 'agent'
                  ? 'bg-blue-500 text-white dark:bg-blue-600 dark:text-white'
                  : 'bg-muted text-foreground dark:bg-gray-800'
              } before:absolute before:top-0 ${
                message.role === 'agent'
                  ? 'before:-right-2 before:border-l-[12px] before:border-t-[12px] before:border-l-transparent before:border-t-blue-500 dark:before:border-t-blue-600'
                  : 'before:-left-2 before:border-r-[12px] before:border-t-[12px] before:border-r-transparent before:border-t-muted dark:before:border-t-gray-800'
              } `}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CallTranscript;
