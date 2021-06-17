<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Adicionar um veículo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title>Adicionar um veículo</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col size="6">
              <ion-item>
                <ion-label position="floating">Veículo</ion-label>
                <ion-input></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="6">
              <ion-item>
                <ion-label position="floating">Modelo</ion-label>
                <ion-input></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="6">
              <ion-item>
                <ion-label>Ano</ion-label>
                <ion-datetime
                  :picker-options="customPickerOptions"
                  placeholder="Ano"
                  display-format="YYYY"
                  min="1960"
                  :max="anoAtual + 1"
                ></ion-datetime>
              </ion-item>
            </ion-col>
            <ion-col> ion-col </ion-col>
          </ion-row>
        </ion-grid>
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
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

export default {
  name: "Add",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup(){
const customPickerOptions = {
      buttons: [{
        text: 'Pronto',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    }
  },
   data() {
        return {
            anoAtual: new Date().getFullYear(),
            
        };
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