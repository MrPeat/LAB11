'use client';

import { useState } from 'react';

export default function ReactionButton({ messageId, initialReactions }: { messageId: string, initialReactions: number }) {
  const [reactions, setReactions] = useState(initialReactions || 0);
  const [isLiking, setIsLiking] = useState(false);

  async function handleReact() {
    setIsLiking(true);
    try {
      const res = await fetch(`/api/messages/${messageId}/react`, {
        method: 'POST',
      });
      if (res.ok) {
        setReactions((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLiking(false);
    }
  }

  return (
    <button 
      onClick={handleReact}
      disabled={isLiking}
      className="mt-3 flex items-center gap-1 text-sm bg-pink-50 hover:bg-pink-100 text-pink-600 px-3 py-1.5 rounded-full transition-colors border border-pink-200"
    >
      <span>❤️</span>
      <span className="font-medium">{reactions}</span>
    </button>
  );
}
