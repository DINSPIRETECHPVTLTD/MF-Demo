import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const [stats, setStats] = useState({
    branches: 0,
    centers: 0,
    members: 0
  });

  useEffect(() => {
    if (!user) {
      history.push('/login');
      return;
    }
    loadStats();
  }, [user]);

  const loadStats = async () => {
    try {
      const [branches, centers, members] = await Promise.all([
        apiService.getBranches(),
        apiService.getCenters(),
        apiService.getMembers()
      ]);
      setStats({
        branches: branches.data.length,
        centers: centers.data.length,
        members: members.data.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Statistics</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardContent>
                      <h2>{stats.branches}</h2>
                      <p>Branches</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardContent>
                      <h2>{stats.centers}</h2>
                      <p>Centers</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardContent>
                      <h2>{stats.members}</h2>
                      <p>Members</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>User Information</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Type:</strong> {user?.userType}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            {user?.organizationId && <p><strong>Organization ID:</strong> {user.organizationId}</p>}
            {user?.branchId && <p><strong>Branch ID:</strong> {user.branchId}</p>}
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" onClick={logout} color="danger">
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

