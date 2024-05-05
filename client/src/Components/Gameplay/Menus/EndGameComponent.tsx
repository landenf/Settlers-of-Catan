import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, collection, where, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase-config';

const EndGameComponent = () => {
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        const updateGameStatistics = async () => {
            if (user) {
                const userProfilesRef = collection(db, "UserProfiles");
                const q = query(userProfilesRef, where("uid", "==", user.uid));

                try {
                    const querySnapshot = await getDocs(q);
                    if (querySnapshot.empty) throw new Error('User profile not found.');

                    const userProfileDoc = querySnapshot.docs[0];
                    const userProfileRef = userProfileDoc.ref;

                    const response = await fetch(`https://5000/stats?uid=${user.uid}`); //update to how we want to process this
                    if (!response.ok) throw new Error('Failed to fetch game statistics.');

                    const statsData = await response.json();

                    await updateDoc(userProfileRef, {
                        gameWins: statsData.gameWins
                    });

                    console.log('Game statistics updated successfully.');
                } catch (error) {
                    console.error('Error updating game statistics:', error);
                }
            }
        };

        if (user) {
            updateGameStatistics();
        }
    }, [user]); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return null; //return end game modal 
};

export default EndGameComponent;
