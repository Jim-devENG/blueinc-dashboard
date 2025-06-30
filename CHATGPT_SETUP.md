# 🤖 ChatGPT API Integration Setup Guide

This guide will help you integrate the real ChatGPT API into your Blueinc dashboard bots for more intelligent and dynamic conversations.

## 📋 Prerequisites

1. **OpenAI Account**: You need an OpenAI account to access the API
2. **API Key**: A valid OpenAI API key with credits
3. **Node.js**: Your development environment should be running

## 🔑 Step 1: Get Your OpenAI API Key

1. **Visit OpenAI Platform**: Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. **Sign In**: Log in to your OpenAI account (or create one if you don't have it)
3. **Create API Key**: Click "Create new secret key"
4. **Copy the Key**: Save the generated API key securely (it starts with `sk-`)

## ⚙️ Step 2: Configure Environment Variables

1. **Open `.env` file** in your `blueinc-dashboard` directory
2. **Add your API key**:
   ```env
   VITE_OPENAI_API_KEY=sk-your_actual_api_key_here
   ```
3. **Save the file**

## 🚀 Step 3: Test the Integration

1. **Restart your development server**:

   ```bash
   cd blueinc-dashboard
   npm run dev
   ```

2. **Open the Bot Console** in your dashboard
3. **Click "Chat"** on any bot
4. **Look for the "AI Powered" badge** - this indicates ChatGPT integration is active

## 🎯 Features Available with ChatGPT API

### ✅ **Enhanced Capabilities**

- **Real AI responses** instead of pre-written scripts
- **Context awareness** - bots remember conversation history
- **Dynamic responses** - no two conversations are exactly the same
- **Professional tone** - responses are tailored to business context
- **Multi-turn conversations** - bots can handle complex discussions

### 🤖 **Bot-Specific Intelligence**

#### **SupportBot**

- Technical troubleshooting with real AI insights
- Dynamic problem-solving based on user descriptions
- Contextual account and system assistance

#### **HRBot**

- Intelligent policy explanations
- Dynamic leave request processing
- Personalized benefits guidance

#### **FinanceBot**

- Smart expense categorization
- Dynamic budget analysis
- Intelligent financial advice

#### **SalesBot**

- Lead qualification with AI insights
- Dynamic sales strategy recommendations
- Intelligent customer relationship advice

#### **MarketingBot**

- Creative campaign suggestions
- Dynamic content recommendations
- Intelligent performance analysis

## 💰 Cost Considerations

### **API Pricing** (as of 2024)

- **GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **Typical conversation**: 50-200 tokens per exchange
- **Estimated cost**: $0.01-$0.05 per conversation

### **Cost Optimization Tips**

1. **Set reasonable limits** in the API configuration
2. **Monitor usage** through OpenAI dashboard
3. **Use fallback responses** for simple queries
4. **Implement rate limiting** if needed

## 🔧 Advanced Configuration

### **Customize Bot Personalities**

Edit `app/lib/chatgpt.ts` to modify system prompts:

```typescript
private getSystemPrompt(botType: string): string {
  // Customize the personality and capabilities for each bot type
  switch (botType) {
    case 'Support':
      return `You are a technical support specialist...`;
    // Add more customizations
  }
}
```

### **Adjust Response Parameters**

Modify the API call parameters in `generateResponse()`:

```typescript
const requestBody = {
  model: "gpt-3.5-turbo",
  temperature: 0.7, // Creativity (0.0 = focused, 1.0 = creative)
  max_tokens: 500, // Response length limit
  top_p: 1, // Response diversity
  // Add more parameters as needed
};
```

## 🛠️ Troubleshooting

### **Common Issues**

#### **"API Unavailable" Badge**

- **Cause**: Missing or invalid API key
- **Solution**: Check your `.env` file and API key validity

#### **"Error generating bot response"**

- **Cause**: API rate limits or network issues
- **Solution**: Check OpenAI dashboard for quota status

#### **Slow Responses**

- **Cause**: Network latency or API queue
- **Solution**: Responses are typically 1-3 seconds

### **Fallback System**

- If ChatGPT API is unavailable, bots automatically use intelligent fallback responses
- No interruption to user experience
- Seamless degradation

## 🔒 Security Considerations

### **API Key Security**

- **Never commit API keys** to version control
- **Use environment variables** (already configured)
- **Rotate keys regularly** for production use
- **Monitor usage** for unusual activity

### **Data Privacy**

- **Conversation data** is sent to OpenAI for processing
- **No persistent storage** of conversations in our system
- **Consider data retention** policies for your use case

## 📊 Monitoring & Analytics

### **Track Usage**

- Monitor API calls in OpenAI dashboard
- Track conversation quality and user satisfaction
- Monitor costs and usage patterns

### **Performance Metrics**

- Response time tracking
- Success/failure rates
- User engagement metrics

## 🎉 Next Steps

1. **Test with real conversations** - try complex queries
2. **Customize bot personalities** - adjust system prompts
3. **Monitor performance** - track usage and costs
4. **Scale as needed** - add more bots or features

## 📞 Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your API key is valid and has credits
3. Check OpenAI service status
4. Review the fallback system is working

---

**Happy chatting with your AI-powered bots! 🤖✨**
