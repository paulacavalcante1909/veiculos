<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-searchbar
        v-model="pesquisa"
        animated
        v-on:keyup.enter="search()"
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
        <ion-card v-for="(veiculo, index) in veiculos" :key="index">
          <ion-card-header>
            <ion-card-subtitle>
              Código: #{{ veiculo.id }} | {{ veiculo.marca }} | Ano:
              {{ veiculo.ano }}</ion-card-subtitle
            >
            <ion-card-title>{{ veiculo.veiculo }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {{ veiculo.descricao }} <br />
            <hr />
            <ion-button slot="end" color="success" :href="'/edit/' + veiculo.id"
              >Editar</ion-button
            >
            <ion-button
              slot="end"
              color="danger"
              @click="presentAlertConfirm(veiculo.id)"
              >Excluir</ion-button
            ></ion-card-content
          >
        </ion-card>
      </div>
      <div id="container1" v-else>
        <h1>Não há veículos cadastrados</h1>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonButton,
  alertController,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButtons,
  IonHeader,
  IonSearchbar,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import axios from "axios";

import { API } from "./../class/Variables";
import $ from "jquery";
export default defineComponent({
  name: "All",
  components: {
    IonButtons,
    IonButton,
    IonSearchbar,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
  },

  data() {
    return {
      veiculos: null,
      pesquisa: null as any,
    };
  },
  methods: {
    listar: function () {
      axios
        .get(API + "/veiculos")
        .then((response) => {
          if (response.data.length > 0) {
            this.veiculos = response.data;
          } else {
            this.veiculos = null;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async presentAlertConfirm(id: any) {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirmar exclusão",
        message: "Você tem certeza que deseja excluir o veículo " + id + "",
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirmar Cancel:", blah);
            },
          },
          {
            text: "Excluir",
            handler: () => {
              this.excluir(id);
            },
          },
        ],
      });
      return alert.present();
    },

    search: function () {
      axios
        .get(API + "/find?q=" + this.pesquisa)
        .then((response) => {
          this.veiculos = response.data;
          console.log(this.veiculos);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    excluir: function (id: any) {
      $.ajax({
        url: API + "/veiculos/" + id,
        type: "DELETE",
      }).done((res: any) => {
        this.listar();
      });
    },
  },
  created: function () {
    this.listar();
  },
});
</script>

<style scoped>
#container1 {
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