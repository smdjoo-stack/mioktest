import React, { useState, useEffect } from 'react';
import { generateCreativeImage, ensureApiKey, promptForApiKey } from '../services/geminiService';
import { ImageSize, AspectRatio } from '../types';

const Playground: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    const valid = await ensureApiKey();
    setHasKey(valid);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const validKey = await ensureApiKey();
    if (!validKey) {
       setHasKey(false);
       setIsLoading(false);
       return;
    }
    setHasKey(true);

    const result = await generateCreativeImage({
      prompt,
      size,
      aspectRatio,
    });

    if (result.error) {
      if (result.error.includes("Key")) {
          setHasKey(false);
      }
      setError(result.error);
    } else if (result.imageUrl) {
      setResultImage(result.imageUrl);
    }

    setIsLoading(false);
  };

  const handleConnectKey = async () => {
    await promptForApiKey();
    setHasKey(true); 
    setError(null);
  };

  return (
    <section id="playground" className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto border-t-2 border-black">
      <div className="mb-16">
        <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-4">
          Creation<br/>Lab
        </h2>
        <p className="text-xl font-bold text-black max-w-2xl">
          Powered by Gemini 3 Pro (Nano Banana Pro). Generate high-fidelity visuals in 1K, 2K, or 4K.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 bg-black text-brand-base p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
          {!hasKey ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-black mb-4 text-white">API Access Required</h3>
              <p className="text-brand-base/80 mb-8 font-medium">Connect your Google Cloud Project API key to unlock the 4K generation capabilities.</p>
              <button
                onClick={handleConnectKey}
                className="w-full px-6 py-4 bg-brand-base text-black font-black uppercase tracking-wider hover:bg-white transition-colors"
              >
                Connect API Key
              </button>
            </div>
          ) : (
            <form onSubmit={handleGenerate} className="space-y-8">
              <div>
                <label htmlFor="prompt" className="block text-sm font-bold uppercase tracking-wider mb-2 text-white">
                  Prompt
                </label>
                <textarea
                  id="prompt"
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your vision..."
                  className="w-full px-4 py-3 bg-white/10 border-2 border-brand-base text-white placeholder-brand-base/50 focus:outline-none focus:bg-white/20 transition-all font-medium text-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-white">Size</label>
                  <div className="flex gap-2">
                    {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`flex-1 py-2 text-sm font-bold border-2 transition-all ${
                          size === s
                            ? 'bg-brand-base border-brand-base text-black'
                            : 'bg-transparent border-white/20 text-white hover:border-brand-base'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-white">Ratio</label>
                   <select 
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                    className="w-full px-4 py-2.5 bg-transparent border-2 border-white/20 text-white font-bold focus:outline-none focus:border-brand-base appearance-none rounded-none"
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="1:1" className="text-black">1:1 Square</option>
                    <option value="16:9" className="text-black">16:9 Landscape</option>
                    <option value="9:16" className="text-black">9:16 Portrait</option>
                    <option value="4:3" className="text-black">4:3 Standard</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500 text-white font-bold text-sm border-2 border-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`w-full py-5 px-6 font-black uppercase tracking-wider text-xl transition-all border-2 ${
                  isLoading || !prompt.trim()
                    ? 'bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed'
                    : 'bg-white text-black border-white hover:bg-brand-base hover:border-brand-base hover:text-black'
                }`}
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </form>
          )}
        </div>

        {/* Display Area */}
        <div className="lg:col-span-7 min-h-[600px] border-4 border-black bg-white flex items-center justify-center p-4 relative">
          
          {resultImage ? (
            <div className="relative w-full h-full flex items-center justify-center group">
               <img
                src={resultImage}
                alt="Generated Artwork"
                className="max-w-full max-h-[700px] object-contain shadow-2xl"
              />
              <div className="absolute top-4 right-4">
                <a 
                  href={resultImage} 
                  download={`lumina-gen-${Date.now()}.png`}
                  className="inline-flex items-center px-4 py-2 bg-black text-white font-bold text-sm hover:bg-brand-base transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 opacity-40">
              <h3 className="text-4xl font-black text-black mb-2">OUTPUT</h3>
              <p className="text-black font-medium">
                Waiting for input signal...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Playground;