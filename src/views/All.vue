<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-searchbar
        animated
        placeholder="'chevrolet 2008'"
        show-cancel-button="focus"
      ></ion-searchbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Todos os veículos</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container" v-if="veiculos != null">
        <ion-card v-for="(index, veiculo) in veiculos" :key="index">
          <ion-card-header>
            <ion-card-subtitle>
              {{ veiculo.id }} | {{ veiculo.modelo }}|
              {{ veiculo.ano }}</ion-card-subtitle
            >
            <ion-card-title>Carro</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {{ veiculo.descricao }} <br />
            <hr />
            <ion-button slot="end" color="success">Editar</ion-button>
            <ion-button slot="end" color="danger"
              >Excluir</ion-button
            ></ion-card-content
          >
        </ion-card>
      </div>
      <div id="container" v-else>
        <h1>Não há veículos cadastrados</h1>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import axios from "axios";

import { API } from "./../class/Variables";

export default defineComponent({
  name: "All",
  components: {
    IonContent,
    IonPage,
    IonButton,
  },

  data() {
    return {
      veiculos: null,
    };
  },
  methods: {
    listar: function () {
      axios
        .get(API + "/veiculos")
        .then((response) => {
          if (response.data.length > 0) {
           
            this.veiculos = response.data;
             console.log(this.veiculos);
          } else {
            this.veiculos = null;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created: function () {
    this.listar();
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
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