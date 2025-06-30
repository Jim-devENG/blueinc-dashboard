import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  CheckCircle, 
  Clock, 
  Zap, 
  Target, 
  Users, 
  FolderOpen, 
  CheckSquare, 
  Calendar, 
  Mail, 
  Bot, 
  BarChart3, 
  ShoppingCart, 
  Globe, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Shield, 
  Cloud, 
  TrendingUp, 
  Database,
  Star,
  ArrowRight
} from 'lucide-react';

interface Feature {
  name: string;
  description: string;
  icon: any;
  status: 'implemented' | 'coming-soon';
  phase: number;
  category: string;
  benefits: string[];
}

const features: Feature[] = [
  // Phase 1 - Implemented Features
  {
    name: 'User Authentication',
    description: 'Secure user authentication with Clerk.js integration',
    icon: Shield,
    status: 'implemented',
    phase: 1,
    category: 'Core',
    benefits: ['Secure login/logout', 'User profiles', 'Role-based access', 'Social login options']
  },
  {
    name: 'Staff Management',
    description: 'Comprehensive employee management system',
    icon: Users,
    status: 'implemented',
    phase: 1,
    category: 'HR',
    benefits: ['Employee profiles', 'Department management', 'Contact information', 'Performance tracking']
  },
  {
    name: 'Project Management',
    description: 'Full project lifecycle management',
    icon: FolderOpen,
    status: 'implemented',
    phase: 1,
    category: 'Projects',
    benefits: ['Project creation', 'Task assignment', 'Progress tracking', 'Team collaboration']
  },
  {
    name: 'Task Management',
    description: 'Organize and track tasks efficiently',
    icon: CheckSquare,
    status: 'implemented',
    phase: 1,
    category: 'Tasks',
    benefits: ['Task creation', 'Priority levels', 'Due dates', 'Status tracking']
  },
  {
    name: 'Timesheets & Leave',
    description: 'Time tracking and leave management',
    icon: Calendar,
    status: 'implemented',
    phase: 1,
    category: 'HR',
    benefits: ['Time tracking', 'Leave requests', 'Approval workflow', 'Reporting']
  },
  {
    name: 'Mail Management',
    description: 'Centralized email and communication hub',
    icon: Mail,
    status: 'implemented',
    phase: 1,
    category: 'Communication',
    benefits: ['Email integration', 'Message organization', 'Contact management', 'Communication history']
  },
  {
    name: 'AI-Powered Bots',
    description: 'Intelligent chatbots with ChatGPT integration',
    icon: Bot,
    status: 'implemented',
    phase: 1,
    category: 'AI',
    benefits: ['Real AI responses', 'Context awareness', 'Bot-specific intelligence', 'Automation capabilities']
  },
  {
    name: 'Email Marketing',
    description: 'Complete email campaign management',
    icon: Target,
    status: 'implemented',
    phase: 1,
    category: 'Marketing',
    benefits: ['Campaign creation', 'Template management', 'Analytics tracking', 'Automation workflows']
  },

  // Phase 2 - Coming Soon
  {
    name: 'Advanced Analytics',
    description: 'Comprehensive business intelligence and reporting',
    icon: BarChart3,
    status: 'coming-soon',
    phase: 2,
    category: 'Analytics',
    benefits: ['Custom dashboards', 'Real-time reporting', 'Data visualization', 'Performance metrics']
  },
  {
    name: 'E-commerce Platform',
    description: 'Complete online store management',
    icon: ShoppingCart,
    status: 'coming-soon',
    phase: 2,
    category: 'E-commerce',
    benefits: ['Product catalog', 'Inventory management', 'Order processing', 'Payment integration']
  },
  {
    name: 'Website Builder',
    description: 'Drag-and-drop website creation',
    icon: Globe,
    status: 'coming-soon',
    phase: 2,
    category: 'Web',
    benefits: ['Visual editor', 'Template library', 'SEO optimization', 'Mobile responsive']
  },
  {
    name: 'Advanced CRM',
    description: 'Enhanced customer relationship management',
    icon: Building2,
    status: 'coming-soon',
    phase: 2,
    category: 'Sales',
    benefits: ['Lead scoring', 'Sales pipelines', 'Customer insights', 'Automation workflows']
  },
  {
    name: 'Workflow Automation',
    description: 'Visual workflow builder and automation',
    icon: Zap,
    status: 'coming-soon',
    phase: 2,
    category: 'Automation',
    benefits: ['Visual builder', 'Trigger automation', 'Conditional logic', 'Integration capabilities']
  },
  {
    name: 'Mobile Applications',
    description: 'Native mobile apps for iOS and Android',
    icon: Smartphone,
    status: 'coming-soon',
    phase: 2,
    category: 'Mobile',
    benefits: ['Native performance', 'Offline capabilities', 'Push notifications', 'Cross-platform sync']
  },

  // Phase 3 - Coming Soon
  {
    name: 'Enterprise Security',
    description: 'Advanced security and compliance features',
    icon: Shield,
    status: 'coming-soon',
    phase: 3,
    category: 'Security',
    benefits: ['SSO integration', 'Advanced encryption', 'Audit trails', 'Compliance reporting']
  },
  {
    name: 'Cloud Integration',
    description: 'Seamless cloud service integration',
    icon: Cloud,
    status: 'coming-soon',
    phase: 3,
    category: 'Integration',
    benefits: ['Multi-cloud support', 'API management', 'Data synchronization', 'Scalable infrastructure']
  },
  {
    name: 'Advanced Analytics',
    description: 'AI-powered predictive analytics',
    icon: TrendingUp,
    status: 'coming-soon',
    phase: 3,
    category: 'AI',
    benefits: ['Predictive modeling', 'Machine learning', 'Business insights', 'Trend analysis']
  },
  {
    name: 'Data Warehouse',
    description: 'Enterprise data management and analytics',
    icon: Database,
    status: 'coming-soon',
    phase: 3,
    category: 'Data',
    benefits: ['Data warehousing', 'ETL processes', 'Big data analytics', 'Data governance']
  },
  {
    name: 'Payment Processing',
    description: 'Integrated payment gateway and processing',
    icon: CreditCard,
    status: 'coming-soon',
    phase: 3,
    category: 'Finance',
    benefits: ['Multiple gateways', 'Secure processing', 'Fraud protection', 'Financial reporting']
  }
];

export default function FeaturesOverviewPage() {
  const [activePhase, setActivePhase] = useState<number | 'all'>(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(features.map(f => f.category)))];
  const phases = [1, 2, 3];

  const filteredFeatures = features.filter(feature => {
    const phaseMatch = activePhase === 'all' || feature.phase === activePhase;
    const categoryMatch = activeCategory === 'all' || feature.category === activeCategory;
    return phaseMatch && categoryMatch;
  });

  const implementedCount = features.filter(f => f.status === 'implemented').length;
  const comingSoonCount = features.filter(f => f.status === 'coming-soon').length;

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Features Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Discover what's available now and what's coming soon in your Blueinc dashboard
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Implemented</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{implementedCount}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Coming Soon</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{comingSoonCount}</p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Features</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{features.length}</p>
                </div>
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                  <Star className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Phase Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActivePhase('all')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activePhase === 'all'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              All Phases
            </button>
            {phases.map((phase) => (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activePhase === phase
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Phase {phase}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.name}
                className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-lg ${
                  feature.status === 'coming-soon' ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      feature.status === 'implemented' 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : 'bg-yellow-100 dark:bg-yellow-900'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        feature.status === 'implemented'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-yellow-600 dark:text-yellow-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {feature.name}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        feature.status === 'implemented'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {feature.status === 'implemented' ? 'Available' : 'Coming Soon'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    Phase {feature.phase}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <ArrowRight className="h-3 w-3 mr-2 text-indigo-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {feature.status === 'implemented' && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200">
                      Try Now
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Roadmap Section */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Development Roadmap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Phase 1 - Complete</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Core business management features with AI integration
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Phase 2 - Coming Soon</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced features and integrations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Phase 3 - Future</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enterprise-level features and scalability
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 