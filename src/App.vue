<template>
  <div id="app">
    <h1>Crypto Profit and Loss Calculator</h1>
<!-- Formulario para agregar una nueva cripto -->
<div class="crypto-form">
      <h2>Añadir Nueva Criptomoneda</h2>
      <form @submit.prevent="addCrypto">
        <div>
          <label>Nombre:</label>
          <input v-model="newCrypto.name" type="text" required />
        </div>
        <div>
          <label>Símbolo:</label>
          <input v-model="newCrypto.symbol" type="text" required />
        </div>
        <div>
          <label>Cantidad:</label>
          <input v-model.number="newCrypto.quantity" type="number" step="0.00000001" required />
        </div>
        <div>
          <label>Precio de Compra:</label>
          <input v-model.number="newCrypto.buyPrice" type="number"  step="0.00000001" required />
        </div>
        <button type="submit">Añadir Criptomoneda</button>
      </form>
    </div>
    <!-- Tabla de criptos -->
    <CryptoTable 
      :cryptos="cryptos" 
      :currentPrices="currentPrices" 
      @updateCrypto="updateCrypto"
    />

    
  </div>
</template>

<script>
import CryptoTable from './components/CryptoTable.vue';
import axios from 'axios';
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from './firebase';

export default {
  components: {
    CryptoTable,
  },
  data() {
    return {
      cryptos: [],
      currentPrices: {},
      newCrypto: {
        name: '',
        symbol: '',
        quantity: 0,
        buyPrice: 0,
      },
      intervalId: null,
    };
  },
  async mounted() {
    await this.fetchCryptosFromFirebase();
    this.fetchCryptoPrices();

    // Refrescar precios cada 15 segundos
    this.intervalId = setInterval(() => {
      this.fetchCryptoPrices();
    }, 15000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    // Obtener datos de Firestore
    async fetchCryptosFromFirebase() {
      const querySnapshot = await getDocs(collection(db, "cryptos"));
      this.cryptos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    // Guardar cambios de criptos existentes en Firestore
    async updateCrypto(updatedCrypto) {
      const cryptoDoc = doc(db, "cryptos", updatedCrypto.id);
      await updateDoc(cryptoDoc, updatedCrypto);
      await this.fetchCryptosFromFirebase();
    },
    // Añadir nueva cripto a Firebase
    async addCrypto() {
      try {
        // Añadir nueva cripto a Firestore
        await addDoc(collection(db, "cryptos"), {
          name: this.newCrypto.name,
          symbol: this.newCrypto.symbol,
          quantity: this.newCrypto.quantity,
          buyPrice: this.newCrypto.buyPrice,
        });

        // Limpiar el formulario
        this.newCrypto = {
          name: '',
          symbol: '',
          quantity: 0,
          buyPrice: 0,
        };

        // Refrescar los datos
        await this.fetchCryptosFromFirebase();
      } catch (error) {
        console.error("Error añadiendo criptomoneda:", error);
      }
    },
    // Obtener precios de Binance API
    async fetchCryptoPrices() {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
    
    const prices = response.data; // Esto tiene todos los precios de las criptos.
    
    // Mapear los precios a tus criptos en base al símbolo.
    this.cryptos.forEach(crypto => {
      const foundPrice = prices.find(p => p.symbol === crypto.symbol);
      if (foundPrice) {
        this.currentPrices[crypto.symbol] = parseFloat(foundPrice.price);
       // console.log(this.currentPrices[crypto.symbol]);
        console.log( (crypto.quantity * this.currentPrices[crypto.symbol]).toFixed(2));
      }
    });
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
}
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}

.crypto-form {
  margin-top: 30px;
}

.crypto-form label {
  margin-right: 10px;
}

.crypto-form div {
  margin-bottom: 15px;
}
</style>
