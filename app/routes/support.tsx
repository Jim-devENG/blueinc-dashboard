import DashboardLayout from "../layouts/DashboardLayout";

export default function Support() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Support</h1>
          <p className="text-gray-600 dark:text-gray-400">Get help and support for your dashboard.</p>
        </div>
        <div className="card-gradient rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-gray-700 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Need Help?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Contact our support team for assistance with your dashboard.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className="text-gray-500 dark:text-gray-400">Email:</span>
                <span className="text-indigo-600 dark:text-indigo-400">support@blueinc.com</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                <span className="text-indigo-600 dark:text-indigo-400">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 