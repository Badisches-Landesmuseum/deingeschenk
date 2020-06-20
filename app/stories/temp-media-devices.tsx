import React, { useState, useEffect } from 'react';

export const ShowMediaDevices: React.FC = () => {
  const [initialInfo, setInitialInfo] = useState<any>(null);
  const [postStreamInfo, setPostStreamInfo] = useState<any>(null);
  const [trackInfo, setTrackInfo] = useState<any>(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
             .then(setInitialInfo)
             .catch(setInitialInfo);
  }, []);

  useEffect(() => {
    let stream: MediaStream | null = null;

    navigator.mediaDevices.getUserMedia({ audio: true })
             .then((s) => {
               stream = s;
               navigator.mediaDevices.enumerateDevices()
                        .then(setPostStreamInfo)
                        .catch(setPostStreamInfo);

               setTrackInfo(stream.getTracks().map((t) => ({
                 id: t.id,
                 kind: t.kind,
                 label: t.label,
               })));
             })
             .catch(setPostStreamInfo);

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);


  return (
    <>
      <h1>Initial Info</h1>
      <pre>
        {JSON.stringify(initialInfo, undefined, 2)}
      </pre>

      <h1>Post Stream Info</h1>
      <pre>
        {JSON.stringify(postStreamInfo, undefined, 2)}
      </pre>

      <h1>Active Track Info</h1>
      <pre>
        {JSON.stringify(trackInfo, undefined, 2)}
      </pre>
    </>
  );
};
