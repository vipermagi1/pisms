// 이전에 만든 React 컴포넌트를 바닐라 JavaScript로 변환
const App = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [isDarkMode, setIsDarkMode] = React.useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  // ... (이전에 만든 React 컴포넌트 코드)

  return (
    // ... (이전에 만든 JSX 코드)
  );
};

// React 앱 마운트
ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);
