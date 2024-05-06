import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

const PlayerStatisticsComponent = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [profileError, setProfileError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const userProfilesRef = collection(db, "UserProfiles");
                const q = query(userProfilesRef, where("uid", "==", user.uid));
                try {
                    const querySnapshot = await getDocs(q);
                    const userProfileDoc = querySnapshot.docs[0]; 
                    if (userProfileDoc.exists()) {
                        setUserProfile(userProfileDoc.data());
                    } else {
                        setProfileError('User profile not found.');
                    }
                } catch (error: any) {
                    setProfileError(error.message);
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error || profileError) return <div>Error: {error?.message || profileError}</div>;
    if (!user) return <div>Please login to view your profile.</div>;

    return (
        <div>
            <h1>User Profile</h1>
            {userProfile ? (
                <div>
                    <p>UID: {userProfile.UID}</p>
                    <p>Game Wins: {userProfile.gameWins}</p>
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
};

export default PlayerStatisticsComponent;
