// ChatGPT API Integration Service

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatGPTResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class ChatGPTService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openai.com/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(
    messages: ChatMessage[],
    botType: string,
    temperature: number = 0.7
  ): Promise<string> {
    try {
      // Create system message based on bot type
      const systemMessage = this.getSystemPrompt(botType);
      
      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          ...messages
        ],
        temperature: temperature,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      };

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: ChatGPTResponse = await response.json();
      return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response at the moment.';
    } catch (error) {
      console.error('ChatGPT API Error:', error);
      return this.getFallbackResponse(botType, messages[messages.length - 1]?.content || '');
    }
  }

  private getSystemPrompt(botType: string): string {
    const basePrompt = `You are a helpful AI assistant for Blueinc, a business management company. You should be professional, friendly, and knowledgeable. Always provide helpful, accurate information and maintain a conversational tone.`;

    switch (botType) {
      case 'Support':
        return `${basePrompt} You are a technical support specialist. You help users with:
- Account issues and login problems
- Password resets and security
- Bug reports and technical issues
- System status and troubleshooting
- General technical support

Always be patient, clear, and helpful. If you need more information, ask for it politely.`;
      
      case 'HR':
        return `${basePrompt} You are an HR assistant. You help employees with:
- Leave requests and time off
- Company policies and procedures
- Benefits and compensation
- Employee information
- Meeting scheduling
- General HR inquiries

Be professional, empathetic, and maintain confidentiality.`;
      
      case 'Finance':
        return `${basePrompt} You are a finance assistant. You help with:
- Expense reports and reimbursements
- Invoice and payment queries
- Budget information and analysis
- Financial policies and procedures
- Salary and payment information
- General financial inquiries

Be accurate, professional, and helpful with financial matters.`;
      
      case 'Sales':
        return `${basePrompt} You are a sales assistant. You help with:
- Lead management and qualification
- Deal tracking and opportunities
- Customer relationship management
- Sales analytics and reporting
- Sales process optimization
- General sales support

Be enthusiastic, helpful, and focused on driving sales success.`;
      
      case 'Marketing':
        return `${basePrompt} You are a marketing assistant. You help with:
- Campaign management and optimization
- Social media strategy
- Email marketing and newsletters
- Content creation and planning
- Marketing analytics and reporting
- General marketing support

Be creative, data-driven, and focused on marketing success.`;
      
      default:
        return `${basePrompt} You are a general business assistant. Help with any business-related questions and tasks.`;
    }
  }

  private getFallbackResponse(botType: string, userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    // Fallback responses when API is unavailable
    switch (botType) {
      case 'Support':
        if (lowerMessage.includes('account') || lowerMessage.includes('login')) {
          return "I can help you with account issues. Please provide your username or email address so I can assist you further.";
        }
        return "I'm here to help with technical support. Please describe your issue and I'll do my best to assist you.";
      
      case 'HR':
        if (lowerMessage.includes('leave') || lowerMessage.includes('vacation')) {
          return "I can help you with leave requests. What type of leave do you need?";
        }
        return "I'm here to help with HR-related questions. What can I assist you with?";
      
      case 'Finance':
        if (lowerMessage.includes('expense') || lowerMessage.includes('report')) {
          return "I can help you with expense reports. Please provide the details of your expenses.";
        }
        return "I'm here to help with financial matters. What would you like to know?";
      
      default:
        return "I'm here to help! Please let me know what you need assistance with.";
    }
  }
}

// Environment variable for API key
export const getChatGPTService = (): ChatGPTService | null => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your .env file');
    return null;
  }
  return new ChatGPTService(apiKey);
}; 