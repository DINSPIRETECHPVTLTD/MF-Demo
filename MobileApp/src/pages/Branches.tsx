import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';

const Branches: React.FC = () => {
  const { user } = useAuth();
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const response = await apiService.getBranches();
      setBranches(response.data);
    } catch (error) {
      console.error('Error loading branches:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Branches</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {branches.map((branch) => (
            <IonCard key={branch.branchId}>
              <IonCardHeader>
                <IonCardTitle>{branch.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>Address:</strong> {branch.address}</p>
                <p><strong>Phone:</strong> {branch.phone}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Branches;

