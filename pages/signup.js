// pages/quiz_page.js
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function QuizPage() {
    const { isLoaded, user } = useUser();

    useEffect(() => {
        if (isLoaded && user) {
            // Call the register endpoint
            fetch('/api/users/register', {
                method: 'POST',
                credentials: 'include', // Ensures Clerk auth cookies are sent
                headers: {
                    'Content-Type': 'application/json',
                },
                // Body not needed if server extracts user info from Clerk session
            })
                .then(response => response.json())
                .then(data => {
                    console.log('User registration response:', data);
                })
                .catch(err => console.error('Error registering user:', err));
        }
    }, [isLoaded, user]);

    return (
        <div>
            <h1>Welcome to the Quiz Page!</h1>
            {/* ... rest of your quiz page content ... */}
        </div>
    );
}
