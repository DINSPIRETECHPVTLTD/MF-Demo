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

const Members: React.FC = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await apiService.getMembers();
      setMembers(response.data);
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Members</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {members.map((member) => (
            <IonCard key={member.memberId}>
              <IonCardHeader>
                <IonCardTitle>
                  {member.firstName} {member.middleName} {member.lastName}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>Phone:</strong> {member.phone}</p>
                <p><strong>Age:</strong> {member.age}</p>
                <p><strong>Center:</strong> {member.center?.name || 'N/A'}</p>
                <p><strong>Occupation:</strong> {member.occupation}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Members;

