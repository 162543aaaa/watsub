import React, { useState } from 'react';
import { Sparkles, X, Loader2, Wand2 } from 'lucide-react';
import { generateProjectPlan } from '../services/geminiService';
import { AIProjectProposal } from '../types';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (proposal: AIProjectProposal) => void;
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, onProjectCreated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const proposal = await generateProjectPlan(prompt);
      onProjectCreated(proposal);
      onClose();
      setPrompt('');
    } catch (err: any) {
      console.error("AI Generation failed", err);
      setError(err.message || "Failed to generate project. Please check your API key or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        <div className="bg-gradient-to-r from-brand-600 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-lg font-bold">AI Project Creator</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-brand-100 text-sm">
            Describe your goal, and I'll build a complete project plan with prioritized tasks for you.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 mb-2">
              What do you want to achieve?
            </label>
            <textarea
              id="prompt"
              className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none text-slate-800 placeholder-slate-400 bg-slate-50"
              placeholder="e.g., Plan a 3-day company retreat for 20 people..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-100 flex items-start gap-2">
                <span className="mt-0.5">⚠️</span>
                <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all
                ${isGenerating || !prompt.trim() 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-200 hover:shadow-brand-300 active:translate-y-0.5'
                }
              `}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Plan
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 text-center">
          Powered by Google Gemini 2.5 Flash
        </div>
      </div>
    </div>
  );
};
