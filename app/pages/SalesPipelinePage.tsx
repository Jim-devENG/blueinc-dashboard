import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Phone, Mail, MapPin, TrendingUp, Target, DollarSign, Users, Calendar } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  expectedCloseDate: string;
  assignedTo: string;
  lastActivity: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'Tech Solutions Inc.',
    email: 'john.smith@techsolutions.com',
    phone: '+1 (555) 123-4567',
    stage: 'qualified',
    value: 50000,
    probability: 75,
    expectedCloseDate: '2024-02-15',
    assignedTo: 'Sarah Johnson',
    lastActivity: '2024-01-15'
  },
  {
    id: '2',
    name: 'Mike Wilson',
    company: 'Global Tech',
    email: 'mike.w@globaltech.com',
    phone: '+1 (555) 987-6543',
    stage: 'proposal',
    value: 75000,
    probability: 60,
    expectedCloseDate: '2024-02-28',
    assignedTo: 'David Brown',
    lastActivity: '2024-01-14'
  },
  {
    id: '3',
    name: 'Lisa Brown',
    company: 'StartupXYZ',
    email: 'lisa.b@startupxyz.com',
    phone: '+1 (555) 456-7890',
    stage: 'negotiation',
    value: 100000,
    probability: 85,
    expectedCloseDate: '2024-02-10',
    assignedTo: 'Sarah Johnson',
    lastActivity: '2024-01-16'
  },
  {
    id: '4',
    name: 'Alex Johnson',
    company: 'Innovate Corp',
    email: 'alex.j@innovate.com',
    phone: '+1 (555) 321-0987',
    stage: 'prospect',
    value: 25000,
    probability: 25,
    expectedCloseDate: '2024-03-15',
    assignedTo: 'David Brown',
    lastActivity: '2024-01-10'
  }
];

const stages = [
  { key: 'prospect', name: 'Prospect', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
  { key: 'qualified', name: 'Qualified', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { key: 'proposal', name: 'Proposal', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  { key: 'negotiation', name: 'Negotiation', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
  { key: 'closed-won', name: 'Closed Won', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { key: 'closed-lost', name: 'Closed Lost', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
];

export default function SalesPipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const getStageInfo = (stage: string) => {
    return stages.find(s => s.key === stage) || stages[0];
  };

  const totalPipelineValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const weightedValue = leads.reduce((sum, lead) => sum + (lead.value * lead.probability / 100), 0);
  const activeLeads = leads.filter(lead => !lead.stage.includes('closed')).length;
  const wonDeals = leads.filter(lead => lead.stage === 'closed-won').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sales Pipeline</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage your sales opportunities</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blueinc text-white rounded-xl hover:bg-blueinc/90 transition-colors duration-200 shadow-soft"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Lead
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalPipelineValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Weighted Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${Math.round(weightedValue).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Leads</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeLeads}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Target className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Won Deals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{wonDeals}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blueinc focus:border-transparent"
            />
          </div>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blueinc focus:border-transparent"
          >
            <option value="all">All Stages</option>
            {stages.map(stage => (
              <option key={stage.key} value={stage.key}>{stage.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {stages.map(stage => {
          const stageLeads = filteredLeads.filter(lead => lead.stage === stage.key);
          const stageValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);
          
          return (
            <div key={stage.key} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{stage.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stage.color}`}>
                    {stageLeads.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ${stageValue.toLocaleString()}
                </p>
              </div>
              <div className="p-4 space-y-3">
                {stageLeads.map(lead => (
                  <div key={lead.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{lead.company}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          ${lead.value.toLocaleString()} • {lead.probability}%
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {stageLeads.length === 0 && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Lead</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blueinc"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blueinc"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blueinc"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Deal Value
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blueinc"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stage
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blueinc">
                  {stages.map(stage => (
                    <option key={stage.key} value={stage.key}>{stage.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blueinc text-white rounded-lg hover:bg-blueinc/90 transition-colors duration-200"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 