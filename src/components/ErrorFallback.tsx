import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorFallback extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Dierenpaspoort error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#212529',
            color: '#e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif'
          }}
        >
          <p style={{ marginBottom: '1rem', color: '#e76e55' }}>Er ging iets mis.</p>
          <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#9ca3af' }}>
            Herlaad de pagina om het opnieuw te proberen.
          </p>
          <button
            type="button"
            style={{
              padding: '0.5rem 1rem',
              background: '#209cee',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onClick={() => window.location.reload()}
          >
            Herladen
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
