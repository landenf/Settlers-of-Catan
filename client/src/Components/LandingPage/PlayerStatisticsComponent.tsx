import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import "../../Styles/Gameplay/Player/PlayerStats.css";

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

    if (loading || !userProfile) return <div>Loading...</div>;
    if (error || profileError) return <div>Error: {error?.message || profileError}</div>;
    if (!user) return <div>Please login to view your profile.</div>;
    const player_image = `/images/empty-avatar.jpg`;

    return (
        <div className="Profile">
            <div className="main-stats-box">
            <img style={{ height: '15vh', width: '15vh', borderRadius: '90%'}} src={player_image} alt="Avatar Image" />
            <div className="playerName">{userProfile.username}</div>
                <div className="stats">
                    <div className="stats-column">
                        <p className="individual-stat">Total Victory Points: {userProfile.VictoryPoints}</p>
                        <p className="individual-stat">Games Won: {userProfile.GamesWon}</p>
                        <p className="individual-stat">Largest Army: {userProfile.LargestArmy}</p>
                        <p className="individual-stat">Most Roads: {userProfile.MostRoads}</p>
                    </div>
                    <div className="stats-column">
                        <p className="individual-stat">Total Wheat: {userProfile.TotalWheat}</p>
                        <p className="individual-stat">Total Rock: {userProfile.TotalRock}</p>
                        <p className="individual-stat">Total Wood: {userProfile.TotalWood}</p>
                        <p className="individual-stat">Total Brick: {userProfile.TotalBrick}</p>
                        <p className="individual-stat">Total Sheep: {userProfile.TotalSheep}</p>
                    </div>
                </div>
            </div>
       </div>
    );
};

export default PlayerStatisticsComponent;
