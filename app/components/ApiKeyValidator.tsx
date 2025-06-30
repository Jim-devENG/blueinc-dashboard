import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Key } from 'lucide-react';
import { getChatGPTService } from '../lib/chatgpt';

interface ApiKeyValidatorProps {
  onStatusChange?: (status: 'valid' | 'invalid' | 'checking') => void;
}

export default function ApiKeyValidator({ onStatusChange }: ApiKeyValidatorProps) {
  const [status, setStatus] = useState<'valid' | 'invalid' | 'checking' | 'not-set'>('not-set');
  const [message, setMessage] = useState('');

  const validateApiKey = async () => {
    setStatus('checking');
    setMessage('Testing API connection...');
    onStatusChange?.('checking');

    try {
      const chatGPTService = getChatGPTService();
      
      if (!chatGPTService) {
        setStatus('invalid');
        setMessage('API key not found. Please check your .env file.');
        onStatusChange?.('invalid');
        return;
      }

      // Test with a simple message
      const testResponse = await chatGPTService.generateResponse(
        [{ role: 'user', content: 'Hello' }],
        'Support',
        0.1
      );

      if (testResponse && testResponse.length > 0) {
        setStatus('valid');
        setMessage('API key is valid and working!');
        onStatusChange?.('valid');
      } else {
        setStatus('invalid');
        setMessage('API responded but with empty content. Check your API key.');
        onStatusChange?.('invalid');
      }
    } catch (error: any) {
      setStatus('invalid');
      if (error.message?.includes('401')) {
        setMessage('Invalid API key. Please check your credentials.');
      } else if (error.message?.includes('429')) {
        setMessage('Rate limit exceeded. Please try again later.');
      } else if (error.message?.includes('quota')) {
        setMessage('API quota exceeded. Please add credits to your account.');
      } else {
        setMessage(`API test failed: ${error.message || 'Unknown error'}`);
      }
      onStatusChange?.('invalid');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'invalid':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'checking':
        return <AlertCircle className="h-5 w-5 text-yellow-500 animate-pulse" />;
      default:
        return <Key className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'valid':
        return 'text-green-600 dark:text-green-400';
      case 'invalid':
        return 'text-red-600 dark:text-red-400';
      case 'checking':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          OpenAI API Status
        </h3>
        {getStatusIcon()}
      </div>
      
      <p className={`text-sm mb-3 ${getStatusColor()}`}>
        {message || 'Click "Test API" to validate your OpenAI API key'}
      </p>
      
      <button
        onClick={validateApiKey}
        disabled={status === 'checking'}
        className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white text-sm rounded-md font-medium transition-colors duration-200"
      >
        {status === 'checking' ? 'Testing...' : 'Test API Key'}
      </button>
      
      {status === 'invalid' && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
            Setup Required
          </h4>
          <ul className="text-xs text-red-700 dark:text-red-300 space-y-1">
            <li>• Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI Platform</a></li>
            <li>• Add it to your <code className="bg-red-100 dark:bg-red-800 px-1 rounded">.env</code> file as <code className="bg-red-100 dark:bg-red-800 px-1 rounded">VITE_OPENAI_API_KEY=sk-your-key</code></li>
            <li>• Restart your development server</li>
          </ul>
        </div>
      )}
      
      {status === 'valid' && (
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
            Ready to Chat!
          </h4>
          <p className="text-xs text-green-700 dark:text-green-300">
            Your bots are now powered by ChatGPT API. Start a conversation to see the difference!
          </p>
        </div>
      )}
    </div>
  );
} 