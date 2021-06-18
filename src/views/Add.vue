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
                <ion-input id="veiculo" v-model="carro.veiculo"></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="6">
              <ion-item>
                <ion-label position="floating">Modelo</ion-label>
                <ion-input id="modelo" v-model="carro.modelo"></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="6">
              <ion-item>
                <ion-label position="floating">Marca</ion-label>
                <ion-input id="marca" v-model="carro.marca"></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="6">
              <ion-item>
                <ion-label>Ano</ion-label>
                <ion-datetime
                  id="ano"
                  v-model="carro.ano"
                  :picker-options="customPickerOptions"
                  placeholder="Ano"
                  display-format="YYYY"
                  min="1940"
                  :max="anoAtual + 1"
                ></ion-datetime>
              </ion-item>
            </ion-col>
            <ion-col size="6">
              <ion-item>
                <ion-label>Situação</ion-label>
                <ion-select
                  placeholder="Selecione"
                  id="vendido"
                  v-model="carro.vendido"
                >
                  <ion-select-option value="1">Vendido</ion-select-option>
                  <ion-select-option value="0">Disponível</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
            <ion-col size="12">
              <ion-item>
                <ion-label rows="12" position="floating">Descrição</ion-label>
                <ion-textarea
                  id="descricao"
                  v-model="carro.descricao"
                ></ion-textarea>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-button size="large" @click="salvar()" color="success"
          >Inserir</ion-button
        >
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
import { defineComponent } from "vue";
import $ from "jquery";

import { API } from "./../class/Variables";

export default defineComponent({
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
  data() {
    return {
      anoAtual: new Date().getFullYear(),

      carro: {
        modelo: null as any,
        ano: null as any,
        veiculo: null as any,
        descricao: null as any,
        marca: null as any,
        vendido: null as any,
      },
      customPickerOptions: {
        buttons: [
          {
            text: "Pronto",
            handler: () => console.log("Clicked Save!"),
          },
          {
            text: "Log",
            handler: () => {
              console.log("Clicked Log. Do not Dismiss.");
              return false;
            },
          },
        ],
      },
    };
  },
  methods: {
    salvar: function () {
      const ano = '' + $("#ano").val();
      console.log(ano);
      const dados = {
        veiculo: $("#veiculo").val(),
        marca: $("#marca").val(),
        ano: new Date(ano).getFullYear(),
        vendido: $("#vendido").val(),
        modelo: $("#modelo").val(),
        descricao: $("#veiculo").val(),
      };
      console.log(dados);
      $.ajax({
        url: API + "/veiculos",
        type: "POST",
        data: dados,
      }).done((res: any) => {
        console.log(res);
      });
    },
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