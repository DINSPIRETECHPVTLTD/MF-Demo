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
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';

const Organizations: React.FC = () => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<any[]>([]);

  useEffect(() => {
    if (user?.role === 'Owner') {
      loadOrganizations();
    }
  }, [user]);

  const loadOrganizations = async () => {
    try {
      const response = await apiService.getOrganizations();
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error loading organizations:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Organizations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {organizations.map((org) => (
            <IonCard key={org.organizationId}>
              <IonCardHeader>
                <IonCardTitle>{org.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>Address:</strong> {org.address}</p>
                <p><strong>Phone:</strong> {org.phone}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Organizations;

