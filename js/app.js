'use strict';

const { useState, useEffect } = React;

const App = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
    const [currentTab, setCurrentTab] = useState('tasks');
    
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('pismsData');
        return saved ? JSON.parse(saved) : {
            tasks: [
                { id: 1, title: '운동하기', completed: false },
                { id: 2, title: '업무 미팅', completed: false },
                { id: 3, title: '독서', completed: true }
            ],
            finances: [
                { category: '식비', spent: 150000, budget: 500000 },
                { category: '교통비', spent: 80000, budget: 200000 }
            ]
        };
    });

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('pismsData', JSON.stringify(data));
    }, [data]);

    const toggleTask = (id) => {
        setData(prev => ({
            ...prev,
            tasks: prev.tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        }));
    };

    const TaskList = () => (
        React.createElement('div', { className: 'bg-white rounded-lg shadow p-4 dark:bg-gray-800' },
            React.createElement('h2', { className: 'text-xl font-bold mb-4 dark:text-white' }, '할 일 목록'),
            data.tasks.map(task =>
                React.createElement('div', {
                    key: task.id,
                    className: 'flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer',
                    onClick: () => toggleTask(task.id)
                },
                    React.createElement('input', {
                        type: 'checkbox',
                        checked: task.completed,
                        className: 'mr-2',
                        onChange: () => {}
                    }),
                    React.createElement('span', {
                        className: `${task.completed ? 'line-through text-gray-500' : ''} dark:text-white`
                    }, task.title)
                )
            )
        )
    );

    const FinanceList = () => (
        React.createElement('div', { className: 'bg-white rounded-lg shadow p-4 dark:bg-gray-800' },
            React.createElement('h2', { className: 'text-xl font-bold mb-4 dark:text-white' }, '재정 관리'),
            data.finances.map((item, index) =>
                React.createElement('div', {
                    key: index,
                    className: 'mb-4'
                },
                    React.createElement('div', { className: 'flex justify-between mb-2 dark:text-white' },
                        React.createElement('span', {}, item.category),
                        React.createElement('span', {}, 
                            `${item.spent.toLocaleString()}원 / ${item.budget.toLocaleString()}원`
                        )
                    ),
                    React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700' },
                        React.createElement('div', {
                            className: 'bg-blue-600 h-2.5 rounded-full',
                            style: {
                                width: `${(item.spent / item.budget) * 100}%`
                            }
                        })
                    )
                )
            )
        )
    );

    return React.createElement('div', { 
        className: `max-w-4xl mx-auto p-4 ${isDarkMode ? 'dark' : ''}`
    },
        // 헤더
        React.createElement('div', { 
            className: 'mb-4 bg-blue-500 text-white p-4 rounded-lg shadow flex justify-between items-center'
        },
            React.createElement('h1', { className: 'text-2xl font-bold' }, 'PISMS'),
            React.createElement('div', { className: 'flex items-center gap-4' },
                React.createElement('span', { 
                    className: `inline-block w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`
                }),
                React.createElement('button', {
                    onClick: () => setIsDarkMode(!isDarkMode),
                    className: 'p-2 hover:bg-blue-600 rounded'
                }, isDarkMode ? '🌞' : '🌙')
            )
        ),

        // 탭 네비게이션
        React.createElement('div', { className: 'mb-4' },
            React.createElement('div', { className: 'flex space-x-2 border-b' },
                ['tasks', 'finances'].map(tab =>
                    React.createElement('button', {
                        key: tab,
                        className: `py-2 px-4 ${currentTab === tab 
                            ? 'border-b-2 border-blue-500 text-blue-500' 
                            : 'text-gray-500 hover:text-gray-700'} dark:text-white`,
                        onClick: () => setCurrentTab(tab)
                    }, tab === 'tasks' ? '할 일' : '재정')
                )
            )
        ),

        // 컨텐츠
        React.createElement('div', { className: 'mt-4' },
            currentTab === 'tasks' ? React.createElement(TaskList) : React.createElement(FinanceList)
        )
    );
};

// 앱 마운트
window.onload = () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        ReactDOM.render(React.createElement(App), rootElement);
    }
};
