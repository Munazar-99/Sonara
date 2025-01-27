import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { Call } from '@/features/calls/types';
import CallSummary from './CallSummary';
import CallTranscript from './CallTranscript';
import CallAnalysis from './CallAnalysis';
import AudioPlayer from './AudioPlayer';

export default function CallDetails({ call }: { call: Call }) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <AudioPlayer recordingUrl={call.recordingUrl} duration={call.duration} />

      <div className="flex-shrink-0 border-t" />

      <Tabs
        defaultValue="overview"
        className="flex flex-grow flex-col overflow-hidden"
      >
        <TabsList className="w-full flex-shrink-0 justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-foreground data-[state=active]:border-primary"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="summary"
            className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-foreground data-[state=active]:border-primary"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value="transcript"
            className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-foreground data-[state=active]:border-primary"
          >
            Transcript
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex-grow overflow-auto">
          <CallAnalysis call={call} />
        </TabsContent>

        <TabsContent value="summary" className="flex-grow overflow-auto p-6">
          <CallSummary summary={call.summary} />
        </TabsContent>

        <TabsContent
          value="transcript"
          className="mt-0 h-[calc(100vh-300px)] overflow-auto"
        >
          <CallTranscript transcript={call.transcriptObject} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
