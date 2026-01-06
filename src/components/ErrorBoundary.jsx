import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-black text-white p-10">
                    <div className="bg-red-900/20 border border-red-500 p-8 rounded-xl max-w-2xl w-full">
                        <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong.</h1>
                        <p className="mb-4 text-gray-300">The application crashed. Here is the error:</p>
                        <pre className="bg-black/50 p-4 rounded text-sm text-red-300 overflow-auto mb-4">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <pre className="bg-black/50 p-4 rounded text-xs text-gray-500 overflow-auto h-40">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded mt-4"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
