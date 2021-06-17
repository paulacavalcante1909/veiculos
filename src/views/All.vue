<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button  ></ion-menu-button>
        </ion-buttons>
        <ion-title>Todos os veículos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Todos os veículos</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
       <ion-item>
     
    <ion-label>Button Start/End</ion-label>
    <ion-button color="danger" slot="end">
      Excluir
    </ion-button>
    <ion-button    slot="end">
       
      Editar
    </ion-button>
  </ion-item>
  <ion-item>
     
    <ion-label>Button Start/End</ion-label>
    <ion-button color="danger" slot="end">
      Excluir
    </ion-button>
    <ion-button    slot="end">
       
      Editar
    </ion-button>
  </ion-item>
  <ion-item>
     
    <ion-label>Button Start/End</ion-label>
    <ion-button  color="danger" slot="end">
       
      Excluir
    </ion-button>
       <ion-button    slot="end">
       
      Editar
    </ion-button>
  </ion-item>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

export default {
  name: "All",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  },
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>