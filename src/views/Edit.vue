<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Editar veículo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title>Editar veículo</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container" v-if="carro != null">
        <form id="form_carro">
          <ion-grid>
            <ion-row>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="floating">Veículo</ion-label>
                  <ion-input
                    required
                    id="veiculo"
                    v-model="carro.veiculo"
                  ></ion-input>
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="floating">Marca</ion-label>
                  <ion-input
                    required
                    id="marca"
                    v-model="carro.marca"
                  ></ion-input>
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label>Ano</ion-label>
                  <ion-datetime
                    required
                    id="ano"
                    v-model="carro.ano"
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
                  <ion-select placeholder="Selecione" required id="vendido">
                    <ion-select-option value="1">Vendido</ion-select-option>
                    <ion-select-option value="0">Disponível</ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-col>
              <ion-col size="12">
                <ion-item>
                  <ion-label rows="12" position="floating">Descrição</ion-label>
                  <ion-textarea
                    required
                    id="descricao"
                    v-model="carro.descricao"
                  ></ion-textarea>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
        </form>
        <ion-button size="large" @click="salvar(carro.id)" color="success"
          >Salvar</ion-button
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
  IonGrid,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonDatetime,
  IonRow,
  IonItem,
  alertController,
  toastController,
  IonPage,
  IonLabel,
  IonTitle,
  IonCol,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import $ from "jquery";
import axios from "axios";
import { API } from "./../class/Variables";

export default defineComponent({
  name: "Edit",
  components: {
    IonButtons,
    IonButton,
    IonLabel,
    IonItem,
    IonContent,
    IonCol,
    IonHeader,
    IonSelectOption,
    IonTextarea,
    IonDatetime,
    IonGrid,
    IonSelect,

    IonInput,
    IonMenuButton,
    IonRow,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  data() {
    return {
      anoAtual: new Date().getFullYear(),
      carro: null as any,
    };
  },
  methods: {
    ver: async function () {
      const id = this.$route.params.id;
      console.log(id);
      axios
        .get(API + "/veiculos/" + id)
        .then((response) => {
          this.carro = response.data;
          console.log(this.carro);
          setTimeout(() => {
            $("#vendido").val(this.carro.vendido).trigger("change");
          }, 300);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    salvar: function (id: any) {
      const ano = "" + $("#ano").val();

      if (
        $("#veiculo").val() != null &&
        $("#veiculo").val() != "" &&
        $("#marca").val() != null &&
        $("#marca").val() != "" &&
        new Date(ano).getFullYear() != null &&
        Number(new Date(ano).getFullYear() > 0) &&
        $("#vendido").val() != null &&
        $("#vendido").val() != "" &&
        $("#descricao").val() != null &&
        $("#descricao").val() != ""
      ) {
        const dados = {
          veiculo: $("#veiculo").val(),
          marca: $("#marca").val(),
          ano: new Date(ano).getFullYear(),
          vendido: $("#vendido").val(),
          descricao: $("#descricao").val(),
        };
        $.ajax({
          url: API + "/veiculos/" + id,
          type: "PUT",
          data: dados,
        }).done((res: any) => {
          this.presentAlertConfirm(id);
        });
      }else{
        this.openToast('Todos os campos são obrigatórios');
      }
    },

     async openToast(msg: any) {
      const toast = await toastController
        .create({
          message: msg,
          duration: 2000
        })
      return toast.present();
    },
    async presentAlertConfirm(id: any) {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Veículo alterado com sucesso!",
        message: "Veículo alterado com sucesso!! Código do veículo:" + id + "",
        buttons: [
          {
            text: "Ok",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("ok");
            },
          },
        ],
      });
      return alert.present();
    },

    /* salvar:function(){
         
        const body = new URLSearchParams();
        const ano = '' + this.carro.ano;
        body.append('veiculo', `${this.carro.veiculo}`);
        body.append('marca', `${this.carro.marca}`);
        body.append('ano',`${new Date(ano).getFullYear()}`);
        body.append('descricao', `${this.carro.descricao}`);
        body.append('vendido', `${this.carro.vendido}`);
       
        axios.post(API + "/veiculos", body)
          .then(response => {
            console.log(response)
          
          })
          .catch(function (error) {
           console.log(error)
            
          });
      
    
    }

    */
  },
  created: function () {
    this.ver();
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