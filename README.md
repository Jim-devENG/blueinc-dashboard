# Blueinc Dashboard

A modern React dashboard built with Vite, TailwindCSS, React Router v7, and Clerk.js authentication. Features AI-powered bots with ChatGPT integration for intelligent business assistance.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with dark/light mode support
- **Authentication**: Secure user authentication with Clerk.js
- **Protected Routes**: Role-based access control
- **AI-Powered Bots**: Intelligent chatbots with ChatGPT API integration
- **Real-time Chat**: Advanced conversation capabilities with context awareness
- **Business Management**: Staff, projects, tasks, timesheets, and mail management
- **Automation**: Bot automation with scheduled and trigger-based tasks

## 🏢 Phase 1 Core Business Features

### Customer Management

- Complete customer relationship management
- Customer list with search and filtering
- Add/edit/delete customers with status tracking
- Revenue tracking per customer
- Contact information management

### Sales Pipeline

- Lead tracking across all sales stages
- Pipeline value and weighted value calculations
- Stage-based filtering (Prospect → Qualified → Proposal → Negotiation → Closed)
- Deal value and probability tracking
- Expected close dates

### Invoice & Billing

- Invoice creation and management
- Multiple status tracking (Draft, Sent, Paid, Overdue, Cancelled)
- Payment tracking and revenue reporting
- Customer billing information
- Invoice download and email functionality

### Reports & Analytics

- Revenue and growth metrics
- Customer acquisition tracking
- Project status analytics
- Interactive charts and visualizations
- Top customer performance
- Team productivity metrics

## 🤖 AI Bot Features

### ChatGPT Integration

- **Real AI Responses**: Powered by OpenAI's GPT-3.5-turbo
- **Context Awareness**: Bots remember conversation history
- **Bot-Specific Intelligence**: Specialized responses for different business areas
- **Fallback System**: Intelligent responses when API is unavailable
- **Cost Optimization**: Configurable parameters for efficient usage

### Bot Types

- **SupportBot**: Technical support and troubleshooting
- **HRBot**: Human resources and employee assistance
- **FinanceBot**: Financial queries and expense management
- **SalesBot**: Sales support and lead management
- **MarketingBot**: Marketing strategy and campaign assistance (anything you're reading here is just for the purpose of redeploy)

## 🛠️ Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (for ChatGPT integration)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Jim-devENG/blueinc-dashboard.git
   cd blueinc-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the `blueinc-dashboard` directory:

   ```env
   # Clerk Authentication
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

   # OpenAI API Key (Optional - for ChatGPT integration)
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. **Get API Keys**

   - **Clerk**: Sign up at [clerk.com](https://clerk.com) and get your publishable key
   - **OpenAI**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🤖 ChatGPT API Setup

For enhanced bot capabilities, follow the detailed setup guide in [CHATGPT_SETUP.md](./CHATGPT_SETUP.md).

### Quick Setup

1. Get your OpenAI API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Add it to your `.env` file: `VITE_OPENAI_API_KEY=sk-your-key-here`
3. Restart your development server
4. Test the API using the validator in the Bot Console

### Features with ChatGPT

- **Real AI responses** instead of pre-written scripts
- **Context awareness** - bots remember conversation history
- **Dynamic responses** - no two conversations are exactly the same
- **Professional tone** - responses tailored to business context
- **Multi-turn conversations** - handle complex discussions

## 📁 Project Structure

```
blueinc-dashboard/
├── app/
│   ├── components/          # Reusable UI components
│   ├── layouts/            # Layout components
│   ├── lib/               # Utilities and services
│   │   └── chatgpt.ts     # ChatGPT API integration
│   ├── pages/             # Page components
│   └── routes/            # Route definitions
├── public/                # Static assets
└── package.json
```

## 🎯 Usage

### Authentication

- Users are redirected to login if not authenticated
- Protected routes require valid authentication
- User information is displayed in the navbar

### Bot Console

- Create and manage AI-powered bots
- Chat with bots for intelligent assistance
- Configure automation tasks
- Monitor bot status and activity

### Business Management

- **Staff**: Manage employee information
- **Projects**: Track project progress and details
- **Tasks**: Organize and assign tasks
- **Timesheets**: Monitor time tracking and leave
- **Mail**: Email management interface

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v7
- **Authentication**: Clerk.js
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Icons**: Lucide React

## 🔒 Security

- API keys are stored in environment variables
- Authentication is handled securely by Clerk.js
- No sensitive data is stored in the frontend
- HTTPS is recommended for production

## 📊 Cost Considerations

### ChatGPT API Costs

- **GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **Typical conversation**: 50-200 tokens per exchange
- **Estimated cost**: $0.01-$0.05 per conversation

### Optimization Tips

- Set reasonable token limits
- Monitor usage through OpenAI dashboard
- Use fallback responses for simple queries
- Implement rate limiting if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:

1. Check the browser console for error messages
2. Verify your API keys are valid
3. Review the ChatGPT setup guide
4. Check OpenAI service status

---

**Built with ❤️ for modern business management**
