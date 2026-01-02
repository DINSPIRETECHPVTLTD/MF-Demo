import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';

const Centers: React.FC = () => {
  const { user } = useAuth();
  const [centers, setCenters] = useState<any[]>([]);

  useEffect(() => {
    loadCenters();
  }, []);

  const loadCenters = async () => {
    try {
      const response = await apiService.getCenters();
      setCenters(response.data);
    } catch (error) {
      console.error('Error loading centers:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Centers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {centers.map((center) => (
            <IonCard key={center.centerId}>
              <IonCardHeader>
                <IonCardTitle>{center.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{center.description}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Centers;

