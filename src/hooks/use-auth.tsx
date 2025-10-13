'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { account } from '@/lib/appwrite';
import { Models } from 'appwrite';

interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const user = await account.get();
            setUser(user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await account.createOAuth2Session(
                'google',
                `${window.location.origin}/`,
                `${window.location.origin}/login`
            );
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    const signOut = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
