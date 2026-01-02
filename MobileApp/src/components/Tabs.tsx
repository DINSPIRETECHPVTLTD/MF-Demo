import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, business, location, people, person } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Organizations from '../pages/Organizations';
import Branches from '../pages/Branches';
import Centers from '../pages/Centers';
import Members from '../pages/Members';
import { useAuth } from '../contexts/AuthContext';

const Tabs: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/dashboard">
          <IonIcon icon={home} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="organizations" href="/organizations">
          <IonIcon icon={business} />
          <IonLabel>Organizations</IonLabel>
        </IonTabButton>
        <IonTabButton tab="branches" href="/branches">
          <IonIcon icon={location} />
          <IonLabel>Branches</IonLabel>
        </IonTabButton>
        <IonTabButton tab="centers" href="/centers">
          <IonIcon icon={location} />
          <IonLabel>Centers</IonLabel>
        </IonTabButton>
        <IonTabButton tab="members" href="/members">
          <IonIcon icon={people} />
          <IonLabel>Members</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;

