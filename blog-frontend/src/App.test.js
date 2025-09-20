import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the context providers to avoid nested context issues in tests
jest.mock('./context/AuthContext', () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
  useAuth: () => ({
    currentUser: null,
    isAuthenticated: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn()
  })
}));

jest.mock('./context/BlogContext', () => ({
  BlogProvider: ({ children }) => <div>{children}</div>,
  useBlog: () => ({
    posts: [],
    loading: false,
    fetchPosts: jest.fn(),
    createPost: jest.fn()
  })
}));

// Mock child components to simplify testing
jest.mock('./components/layout/Layout', () => ({ children }) => <div>{children}</div>);
jest.mock('./components/layout/Header', () => () => <header>Header</header>);
jest.mock('./components/layout/Footer', () => () => <footer>Footer</footer>);

// Mock page components
jest.mock('./components/posts/PostList', () => () => <div>PostList</div>);
jest.mock('./components/auth/Login', () => () => <div>Login</div>);
jest.mock('./components/auth/Register', () => () => <div>Register</div>);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Basic smoke test - if it renders without throwing, it's good
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  test('renders layout component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  test('renders routes container', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Should render the default route (PostList)
    expect(screen.getByText('PostList')).toBeInTheDocument();
  });

  test('wraps application with context providers', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // The app should render without throwing context errors
    expect(container).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(asFragment()).toMatchSnapshot();
  });
});

// Additional tests for specific routes could be added here
describe('App Routing', () => {
  test('renders home route by default', () => {
    window.history.pushState({}, '', '/');
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('PostList')).toBeInTheDocument();
  });

  // You can add more route-specific tests as needed
});