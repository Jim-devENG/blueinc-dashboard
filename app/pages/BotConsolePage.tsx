import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Bot, Activity, PlusCircle, X, MessageCircle, Play, Square, Settings, Clock, Zap, Database } from 'lucide-react';
import { getChatGPTService } from '../lib/chatgpt';
import ApiKeyValidator from '../components/ApiKeyValidator';

const initialBots = [
  {
    id: 1,
    name: 'SupportBot',
    status: 'Active',
    lastActivity: '2024-06-29 10:15',
    type: 'Support',
    messages: [
      { id: 1, type: 'bot', text: 'Hello! I\'m SupportBot. How can I help you today?', timestamp: '10:15' },
      { id: 2, type: 'user', text: 'I need help with my account', timestamp: '10:16' },
      { id: 3, type: 'bot', text: 'I can help you with account issues. What specific problem are you experiencing?', timestamp: '10:16' }
    ]
  },
  {
    id: 2,
    name: 'HRBot',
    status: 'Idle',
    lastActivity: '2024-06-28 16:40',
    type: 'HR',
    messages: [
      { id: 1, type: 'bot', text: 'Hi! I\'m HRBot. I can help with leave requests, policies, and employee information.', timestamp: '16:40' }
    ]
  },
  {
    id: 3,
    name: 'FinanceBot',
    status: 'Error',
    lastActivity: '2024-06-27 09:05',
    type: 'Finance',
    messages: [
      { id: 1, type: 'bot', text: 'Hello! I\'m FinanceBot. I can help with expense reports and financial queries.', timestamp: '09:05' }
    ]
  },
];

const statusStyles: Record<string, string> = {
  Active: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
  Idle: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200',
  Error: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
};

function BotChatModal({ bot, isOpen, onClose }: { bot: any; isOpen: boolean; onClose: () => void }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(bot.messages || []);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [useChatGPT, setUseChatGPT] = useState(true);
  const [apiStatus, setApiStatus] = useState<'available' | 'unavailable' | 'checking'>('checking');

  // Check ChatGPT API availability on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      const chatGPTService = getChatGPTService();
      if (chatGPTService) {
        setApiStatus('available');
        setUseChatGPT(true);
      } else {
        setApiStatus('unavailable');
        setUseChatGPT(false);
      }
    };
    
    if (isOpen) {
      checkApiStatus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      text: message,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setConversationContext([...conversationContext, message]);
    setMessage('');
    setIsTyping(true);

    try {
      let botResponse: string;

      if (useChatGPT && apiStatus === 'available') {
        // Use real ChatGPT API
        const chatGPTService = getChatGPTService();
        if (chatGPTService) {
          // Convert messages to ChatGPT format
          const chatGPTMessages = messages.map(msg => ({
            role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
            content: msg.text
          }));
          
          // Add current user message
          chatGPTMessages.push({
            role: 'user',
            content: message
          });

          botResponse = await chatGPTService.generateResponse(chatGPTMessages, bot.type);
        } else {
          botResponse = generateAdvancedBotResponse(bot.type, message, conversationContext);
        }
      } else {
        // Use fallback responses
        botResponse = generateAdvancedBotResponse(bot.type, message, conversationContext);
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot' as const,
        text: botResponse,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev: any[]) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating bot response:', error);
      // Fallback response on error
      const fallbackResponse = generateAdvancedBotResponse(bot.type, message, conversationContext);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot' as const,
        text: fallbackResponse,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev: any[]) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateAdvancedBotResponse = (botType: string, userMessage: string, context: string[]) => {
    const lowerMessage = userMessage.toLowerCase();
    const fullContext = [...context, userMessage].join(' ').toLowerCase();
    
    // ChatGPT-like response patterns
    const responses = {
      greeting: [
        "Hello! I'm here to help you. How can I assist you today?",
        "Hi there! I'm ready to help with any questions you might have.",
        "Greetings! I'm your AI assistant. What can I do for you?"
      ],
      clarification: [
        "I'd be happy to help with that. Could you provide a bit more detail?",
        "That's an interesting question. Let me make sure I understand correctly...",
        "I want to make sure I give you the best possible answer. Can you elaborate?"
      ],
      followUp: [
        "Is there anything else you'd like to know about this?",
        "Would you like me to explain this in more detail?",
        "Do you have any other questions related to this topic?"
      ]
    };

    // Check for greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }

    // Check for thanks/gratitude
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! I'm glad I could help. Is there anything else you'd like to know?";
    }

    // Check for goodbye
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
      return "Goodbye! It was great chatting with you. Feel free to come back if you have more questions!";
    }

    // Context-aware responses based on bot type
    switch (botType) {
      case 'Support':
        if (lowerMessage.includes('account') || lowerMessage.includes('login')) {
          return "I can definitely help you with account issues. I'll need to verify your identity first. Could you please provide your username or email address? I'll then check your account status and help resolve any issues you're experiencing.";
        } else if (lowerMessage.includes('password')) {
          return "I understand you're having password issues. I can help you reset your password securely. I'll send a reset link to your registered email address. Please check your inbox and follow the instructions. For security reasons, the link will expire in 24 hours.";
        } else if (lowerMessage.includes('bug') || lowerMessage.includes('error')) {
          const ticketNumber = Math.floor(Math.random() * 10000);
          return `I've created a support ticket for you (Ticket #${ticketNumber}). I'll need some additional information to help our technical team resolve this quickly. Could you please describe:\n\n1. What exactly happened?\n2. What were you trying to do?\n3. What error message did you see?\n\nThis will help us get this resolved as soon as possible.`;
        } else if (lowerMessage.includes('status') || lowerMessage.includes('check')) {
          return "I'm checking your account status right now... Based on my analysis, your account is active and in good standing. All systems are operational, and you have full access to all features. Is there a specific issue you're experiencing?";
        } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
          return "I'm here to help! I can assist with account issues, password resets, bug reports, system status checks, and general technical support. What specific problem are you facing? Please describe it in detail so I can provide the most accurate assistance.";
        } else {
          return "Thank you for reaching out to our support team. I'm here to help with any technical issues, account problems, or general questions you might have. Could you please describe what you need help with? I'll do my best to assist you or escalate to a human agent if needed.";
        }
      
      case 'HR':
        if (lowerMessage.includes('leave') || lowerMessage.includes('vacation')) {
          return "I'd be happy to help you with your leave request. I can guide you through the process step by step. First, let me know what type of leave you need:\n\n• Annual Leave\n• Sick Leave\n• Personal Leave\n• Maternity/Paternity Leave\n• Other\n\nOnce you specify the type, I'll open the appropriate form and help you fill it out.";
        } else if (lowerMessage.includes('policy') || lowerMessage.includes('rules')) {
          return "I can provide detailed information about our company policies. We have comprehensive policies covering:\n\n• Leave and Time Off\n• Benefits and Compensation\n• Code of Conduct\n• Remote Work\n• Health and Safety\n\nWhich policy would you like to learn more about? I can also search for specific topics within these policies.";
        } else if (lowerMessage.includes('benefits')) {
          return "I'd be happy to help you understand your benefits package. I'm accessing your benefits profile now. Our benefits include:\n\n• Health Insurance (Medical, Dental, Vision)\n• 401(k) Retirement Plan\n• Paid Time Off\n• Professional Development\n• Wellness Programs\n\nWhat specific benefit would you like to know more about? I can provide detailed information about coverage, eligibility, and how to access these benefits.";
        } else if (lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
          return "I can help you schedule meetings and manage your calendar. I'll check your availability and help you find the best time slots. What type of meeting do you need to schedule?\n\n• One-on-one meeting\n• Team meeting\n• Client meeting\n• Interview\n• Other\n\nPlease let me know the participants and preferred duration, and I'll suggest available time slots.";
        } else if (lowerMessage.includes('salary') || lowerMessage.includes('pay')) {
          return "I understand you have questions about compensation. I can help you with general information about our salary structure, payment schedules, and benefits. However, for specific salary information, you may need to speak with your manager or HR representative. What would you like to know about our compensation policies?";
        } else {
          return "I'm here to help with all your HR-related questions and needs. I can assist with leave requests, policy information, benefits, scheduling, and general HR inquiries. What would you like to know about? Please provide as much detail as possible so I can give you the most accurate and helpful response.";
        }
      
      case 'Finance':
        if (lowerMessage.includes('expense') || lowerMessage.includes('report')) {
          return "I can help you submit an expense report. I'll guide you through the process step by step. First, let me open the expense submission form for you. You'll need to provide:\n\n• Date of expense\n• Amount\n• Category (travel, meals, office supplies, etc.)\n• Description of the expense\n• Receipt (if applicable)\n\nWould you like me to walk you through each field, or do you have specific questions about expense reporting?";
        } else if (lowerMessage.includes('invoice') || lowerMessage.includes('payment')) {
          return "I can help you with invoice and payment queries. I'm accessing your payment history and invoice records now. I can provide information about:\n\n• Outstanding invoices\n• Payment due dates\n• Payment methods\n• Invoice status\n• Payment history\n\nWhat specific information do you need? Please let me know the invoice number or time period you're interested in.";
        } else if (lowerMessage.includes('budget')) {
          return "I can provide detailed budget information for your department or projects. I'm accessing our budget database now. I can show you:\n\n• Current budget status\n• Spending trends\n• Budget allocations\n• Variance reports\n• Forecasts\n\nWhich department or project would you like budget information for? I can also help you understand budget policies and procedures.";
        } else if (lowerMessage.includes('salary') || lowerMessage.includes('pay')) {
          return "I can help you with salary and payment information. I'm checking your payment records now. Based on your profile, your next payment is scheduled for the 15th of this month. I can also help you with:\n\n• Pay stubs and tax documents\n• Direct deposit information\n• Overtime calculations\n• Bonus payments\n• Tax withholding\n\nWhat specific payment information do you need?";
        } else {
          return "I'm here to help with all your financial matters and questions. I can assist with expense reports, invoices, budget information, payment queries, and general financial inquiries. What would you like to know about? Please provide details so I can give you the most accurate and helpful information.";
        }
      
      case 'Sales':
        if (lowerMessage.includes('lead') || lowerMessage.includes('prospect')) {
          return "I can help you manage your leads and prospects effectively. I'm analyzing your sales pipeline right now. Based on current data, you have 5 active leads this month with a total potential value of $125,000. I can help you with:\n\n• Lead qualification\n• Follow-up scheduling\n• Pipeline management\n• Lead scoring\n• Conversion tracking\n\nWould you like me to show you detailed information about any specific leads or help you prioritize your follow-up activities?";
        } else if (lowerMessage.includes('deal') || lowerMessage.includes('opportunity')) {
          return "I can help you track and manage your deals and opportunities. I'm analyzing your sales data now. Your current conversion rate is 23% this quarter, which is above the team average of 18%. I can provide insights on:\n\n• Deal stages and progression\n• Win/loss analysis\n• Sales forecasting\n• Performance metrics\n• Best practices\n\nWhat specific aspect of your deals would you like to focus on?";
        } else if (lowerMessage.includes('customer') || lowerMessage.includes('client')) {
          return "I can help you manage your customer relationships effectively. I'm accessing your customer database now. You currently have 45 active customers with an average lifetime value of $15,000. I can help you with:\n\n• Customer profiles and history\n• Account management\n• Upselling opportunities\n• Customer satisfaction\n• Retention strategies\n\nWhat would you like to know about your customer base or specific accounts?";
        } else {
          return "I'm here to help you excel in your sales role. I can assist with lead management, deal tracking, customer relationships, sales analytics, and performance optimization. What aspect of your sales process would you like to improve or learn more about?";
        }
      
      case 'Marketing':
        if (lowerMessage.includes('campaign') || lowerMessage.includes('ad')) {
          return "I can help you manage and optimize your marketing campaigns. I'm checking your campaign performance now. Your current campaign has generated 1,234 impressions with a 3.2% click-through rate. I can help you with:\n\n• Campaign performance analysis\n• A/B testing strategies\n• Audience targeting\n• Budget optimization\n• ROI tracking\n\nWhat specific aspect of your campaigns would you like to focus on or improve?";
        } else if (lowerMessage.includes('social') || lowerMessage.includes('media')) {
          return "I can help you manage your social media presence effectively. I'm accessing your social media accounts now. You have 3 scheduled posts for this week across LinkedIn, Twitter, and Facebook. I can help you with:\n\n• Content scheduling\n• Engagement analysis\n• Audience insights\n• Hashtag optimization\n• Performance tracking\n\nWhat would you like to know about your social media strategy or performance?";
        } else if (lowerMessage.includes('email') || lowerMessage.includes('newsletter')) {
          return "I can help you optimize your email marketing efforts. I'm analyzing your email campaign data now. Your last newsletter had a 15% open rate and 2.3% click-through rate, which is above industry averages. I can help you with:\n\n• Email list management\n• Subject line optimization\n• Content personalization\n• Send time optimization\n• Performance analysis\n\nWhat aspect of your email marketing would you like to improve?";
        } else {
          return "I'm here to help you create and execute effective marketing strategies. I can assist with campaign management, social media, email marketing, content creation, and performance analytics. What marketing challenge would you like to tackle or what would you like to learn more about?";
        }
      
      default:
        return "I understand your message and I'm here to help. I can process your request and provide relevant information, assistance, or guidance. Could you please provide more details about what you need help with? I want to make sure I give you the most accurate and helpful response possible.";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl mx-4 h-[700px] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{bot.name}</h3>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[bot.status]}`}>
                  {bot.status}
                </span>
                {apiStatus === 'available' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                    AI Powered
                  </span>
                )}
                {isTyping && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    {apiStatus === 'available' ? 'AI thinking...' : 'typing...'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {apiStatus === 'unavailable' && (
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                API Unavailable
              </div>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg: any) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
              }`}>
                <div className="whitespace-pre-wrap text-sm">{msg.text}</div>
                <p className="text-xs opacity-70 mt-2">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-3 max-w-xs lg:max-w-2xl">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {apiStatus === 'available' ? 'AI is thinking...' : 'AI is thinking...'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message... (Press Enter to send)"
              disabled={isTyping}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping || !message.trim()}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Send
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {apiStatus === 'available' ? (
              "🤖 Powered by ChatGPT API - Ask me anything about " + bot.type.toLowerCase() + " topics!"
            ) : (
              "💡 Using fallback responses. Set VITE_OPENAI_API_KEY in .env for ChatGPT integration."
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function CreateBotModal({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (bot: any) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Idle',
    type: 'Support'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const initialMessage = {
      id: 1,
      type: 'bot' as const,
      text: `Hello! I'm ${formData.name}. How can I help you today?`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    onCreate({
      ...formData,
      lastActivity: now,
      messages: [initialMessage]
    });
    setFormData({ name: '', status: 'Idle', type: 'Support' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create New Bot</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bot Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., SupportBot, HRBot"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bot Type</label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Support">Support</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Idle">Idle</option>
              <option value="Active">Active</option>
              <option value="Error">Error</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Create Bot
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BotAutomationPanel({ bot, isOpen, onClose }: { bot: any; isOpen: boolean; onClose: () => void }) {
  const [automationTasks, setAutomationTasks] = useState([
    { id: 1, name: 'Daily Report Generation', type: 'scheduled', status: 'active', time: '09:00' },
    { id: 2, name: 'Data Backup', type: 'scheduled', status: 'active', time: '02:00' },
    { id: 3, name: 'Email Notifications', type: 'trigger', status: 'active' },
    { id: 4, name: 'Database Cleanup', type: 'scheduled', status: 'inactive', time: '03:00' }
  ]);

  const [newTask, setNewTask] = useState({ name: '', type: 'scheduled', time: '09:00' });

  const handleAddTask = () => {
    if (newTask.name.trim()) {
      const task = {
        id: Date.now(),
        name: newTask.name,
        type: newTask.type,
        status: 'active',
        time: newTask.time
      };
      setAutomationTasks([...automationTasks, task]);
      setNewTask({ name: '', type: 'scheduled', time: '09:00' });
    }
  };

  const toggleTaskStatus = (taskId: number) => {
    setAutomationTasks(tasks =>
      tasks.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'active' ? 'inactive' : 'active' }
          : task
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl mx-4 h-[700px] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{bot.name} - Automation</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Configure automated tasks and workflows</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Automation Tasks */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Automation Tasks</h4>
              <div className="space-y-3">
                {automationTasks.map((task) => (
                  <div key={task.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">{task.name}</h5>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.status === 'active' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                          }`}>
                            {task.status}
                          </span>
                          {task.type === 'scheduled' && (
                            <>
                              <Clock className="h-3 w-3" />
                              {task.time}
                            </>
                          )}
                          {task.type === 'trigger' && (
                            <>
                              <Zap className="h-3 w-3" />
                              Trigger-based
                            </>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          task.status === 'active'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                        }`}
                      >
                        {task.status === 'active' ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add New Task */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Add New Task</h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Task name"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex gap-3">
                    <select
                      value={newTask.type}
                      onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="trigger">Trigger-based</option>
                    </select>
                    {newTask.type === 'scheduled' && (
                      <input
                        type="time"
                        value={newTask.time}
                        onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    )}
                  </div>
                  <button
                    onClick={handleAddTask}
                    className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>

            {/* Integration & Analytics */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Integration & Analytics</h4>
              
              {/* Performance Metrics */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Performance Metrics</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">98%</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">1.2s</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Avg Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1,234</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Tasks Executed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">45</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Active Integrations</div>
                  </div>
                </div>
              </div>

              {/* Connected Systems */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Connected Systems</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Database</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Email System</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Analytics</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-500">CRM System</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-500">Not Connected</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Recent Activity</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Daily report generated</span>
                    <span className="text-gray-500 dark:text-gray-500 text-xs">2 min ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Email notifications sent</span>
                    <span className="text-gray-500 dark:text-gray-500 text-xs">15 min ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Data backup completed</span>
                    <span className="text-gray-500 dark:text-gray-500 text-xs">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BotConsolePage() {
  const [bots, setBots] = useState(initialBots);
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAutomationOpen, setIsAutomationOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newBot, setNewBot] = useState({
    name: '',
    type: 'Support',
    description: ''
  });
  const [apiStatus, setApiStatus] = useState<'valid' | 'invalid' | 'checking'>('checking');

  const handleCreateBot = (newBot: any) => {
    const bot = {
      id: Date.now(),
      name: newBot.name,
      status: 'Idle',
      lastActivity: new Date().toLocaleString(),
      type: newBot.type,
      messages: [
        { 
          id: 1, 
          type: 'bot', 
          text: `Hello! I'm ${newBot.name}. I can help you with ${newBot.type.toLowerCase()} related tasks.`, 
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setBots([...bots, bot]);
    setIsCreateModalOpen(false);
    setNewBot({ name: '', type: 'Support', description: '' });
  };

  const handleBotAction = (bot: any, action: string) => {
    switch (action) {
      case 'chat':
        setSelectedBot(bot);
        setIsChatOpen(true);
        break;
      case 'automation':
        setSelectedBot(bot);
        setIsAutomationOpen(true);
        break;
      case 'start':
        setBots(bots.map(b => b.id === bot.id ? { ...b, status: 'Active' } : b));
        break;
      case 'stop':
        setBots(bots.map(b => b.id === bot.id ? { ...b, status: 'Idle' } : b));
        break;
      case 'delete':
        setBots(bots.filter(b => b.id !== bot.id));
        break;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Bot Console</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage and interact with your automated bots.</p>
            </div>
            <div className="flex gap-6">
              <div className="w-48 card-gradient rounded-2xl shadow-soft p-4 border border-gray-100 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Bots Created</div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{bots.length}</span>
                </div>
              </div>
              <div className="w-56 card-gradient rounded-2xl shadow-soft p-4 border border-gray-100 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Last Bot Activity</div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-900 dark:text-gray-100 text-sm">{bots.reduce((latest, bot) =>
                    bot.lastActivity > latest ? bot.lastActivity : latest,
                    ''
                  ) || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out btn-hover"
          >
            <PlusCircle className="h-5 w-5" />
            Create New Bot
          </button>
        </div>
        <div className="mb-6">
          <ApiKeyValidator onStatusChange={setApiStatus} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {bots.map((bot, index) => (
            <div
              key={bot.id}
              className="card-gradient rounded-2xl shadow-soft p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out card-hover border border-gray-100 dark:border-gray-700"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold status-badge ${statusStyles[bot.status]}`}>
                  {bot.status}
                </span>
                <span className="text-gray-400 dark:text-gray-500 text-xs">{bot.lastActivity}</span>
              </div>
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{bot.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Type: {bot.type}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleBotAction(bot, 'chat')}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </button>
                <button
                  onClick={() => handleBotAction(bot, 'automation')}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  <Zap className="h-4 w-4" />
                  Automation
                </button>
              </div>
              <div className="flex gap-2">
                {bot.status === 'Active' ? (
                  <button
                    onClick={() => handleBotAction(bot, 'stop')}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <Square className="h-4 w-4" />
                    Stop
                  </button>
                ) : (
                  <button
                    onClick={() => handleBotAction(bot, 'start')}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <Play className="h-4 w-4" />
                    Start
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <CreateBotModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateBot}
        />
        {selectedBot && (
          <>
            <BotChatModal
              bot={selectedBot}
              isOpen={isChatOpen}
              onClose={() => {
                setIsChatOpen(false);
                setSelectedBot(null);
              }}
            />
            <BotAutomationPanel
              bot={selectedBot}
              isOpen={isAutomationOpen}
              onClose={() => {
                setIsAutomationOpen(false);
                setSelectedBot(null);
              }}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
} 