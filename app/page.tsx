'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setArticle('');

    try {
      const response = await fetch('https://helperteam.app.n8n.cloud/webhook/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate article');
      }

      const data = await response.text();

      // Clean the response by removing the extra "=" signs
      const cleanedData = data.replace(/^=/, '').replace(/"=\*\*/, '"**');
      const parsedData = JSON.parse(cleanedData);

      setArticle(parsedData.article);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(article);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatArticle = (text: string) => {
    // Convert markdown-style formatting to HTML
    return text
      .split('\n')
      .map((line) => {
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Headers
        if (line.startsWith('**') && line.endsWith('**')) {
          return `<h2 class="text-2xl font-bold mt-6 mb-3 text-gray-800">${line.slice(2, -2)}</h2>`;
        }

        // Empty lines
        if (line.trim() === '') {
          return '<br />';
        }

        return `<p class="mb-3 text-gray-700">${line}</p>`;
      })
      .join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeIn">
            <div className="inline-block mb-4">
              <div className="text-5xl mb-2 drop-shadow-lg">✨</div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-gradient drop-shadow-sm">
              AI Article Generator
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Generate professional, well-structured 500-word articles on any topic using advanced AI
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-600 font-medium">
              <span className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
                <span className="text-green-500">●</span> Powered by Groq AI
              </span>
              <span className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
                <span>⚡</span> Lightning Fast
              </span>
              <span className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
                <span>🎯</span> Professional Quality
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 animate-slideUp">
            <form onSubmit={generateArticle}>
              <div className="mb-6">
                <label htmlFor="topic" className="block text-gray-700 font-semibold mb-3 text-lg flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  Enter Your Topic
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Future of Artificial Intelligence, Climate Change Solutions..."
                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all text-lg bg-white/50"
                    disabled={loading}
                  />
                  {topic && !loading && (
                    <button
                      type="button"
                      onClick={() => setTopic('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-start gap-3 animate-shake">
                  <span className="text-xl">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-semibold py-5 px-8 rounded-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg shadow-xl relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating Your Article...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">✨</span>
                      <span>Generate Article</span>
                      <span className="text-xl">🚀</span>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Article Display */}
          {article && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fadeIn">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-3xl">📄</span>
                  Generated Article
                </h2>
                <button
                  onClick={handleCopy}
                  className={`px-5 py-2.5 rounded-lg transition-all text-sm font-medium flex items-center gap-2 ${copied
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 text-purple-700 border-2 border-purple-200'
                    }`}
                >
                  <span className="text-lg">{copied ? '✓' : '📋'}</span>
                  {copied ? 'Copied!' : 'Copy Article'}
                </button>
              </div>
              <div
                className="prose prose-lg max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatArticle(article) }}
              />

              {/* Article stats */}
              <div className="mt-8 pt-6 border-t-2 border-gray-100 flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  {article.split(' ').length} words
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">⏱️</span>
                  ~{Math.ceil(article.split(' ').length / 200)} min read
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">🤖</span>
                  Generated by AI
                </span>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!article && !loading && (
            <div className="text-center py-12 text-gray-400 animate-fadeIn">
              <div className="text-6xl mb-4">💭</div>
              <p className="text-lg">Enter a topic above to generate your first article</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
