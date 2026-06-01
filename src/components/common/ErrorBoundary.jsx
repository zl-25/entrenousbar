import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto">
              <iconify-icon icon="lucide:alert-circle"></iconify-icon>
            </div>
            <div>
              <h1 className="text-2xl font-bold clash text-white mb-2">Une erreur est survenue</h1>
              <p className="text-gray-400 text-sm mb-4">
                {this.state.error?.message || 'Une erreur inattendue s\'est produite. Veuillez réessayer.'}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold uppercase text-sm transition-all"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
