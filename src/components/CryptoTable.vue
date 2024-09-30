<template>
    <div>
      <h2>Crypto Portfolio</h2>
      <table class="crypto-table">
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Precio de Compra</th>
            <th>Precio Actual</th>
            <th>Inversión</th>
            <th>Valor Actual</th>
            <th>Ganancia/Pérdida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crypto in cryptos" :key="crypto.symbol">
            <td>{{ crypto.name }}</td>
            <td><input type="number" v-model.number="crypto.quantity" class="input-full" /></td>
            <td><input type="number" v-model.number="crypto.buyPrice" class="input-full" /></td>
            <td>{{ currentPrices[crypto.symbol] ? currentPrices[crypto.symbol].toFixed(2) : 'Loading...' }}</td>
            <td>{{ (crypto.quantity * crypto.buyPrice).toFixed(2) }}</td>
            <td>{{ (crypto.quantity * currentPrices[crypto.symbol]).toFixed(2) }}</td>
            <td>{{ ((crypto.quantity * currentPrices[crypto.symbol]) - (crypto.quantity * crypto.buyPrice)).toFixed(2) }}</td>
            <td><button class="action-button" @click="saveChanges(crypto)">Save</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cryptos: Array,
      currentPrices: Object,
    },
    beforeMount(){
        
    },
    methods: {
      saveChanges(crypto) {
        this.$emit('updateCrypto', crypto);
      },
      
    },
   
    
  };
  </script>
  
  <style scoped>
  .input-full {
  width: 100%; /* El input llenará toda la celda */
  height: 100%; /* Asegúrate de que el input llene la celda verticalmente */
  text-align: center;
  font-size: 30px; /* Tamaño de fuente */
  padding: 10px; /* Aumenta el padding interno del input */
  border: 2px solid #ddd; /* Aumenta el borde */
  border-radius: 5px; /* Añade bordes redondeados */
  box-sizing: border-box; /* Incluye padding y borde en el ancho total */
}

.action-button {
  font-size: 30px; /* Tamaño de fuente del botón */
  padding: 15px 25px; /* Aumenta el padding para hacer el botón más grande */
  border: none; /* Quita el borde del botón */
  background-color: #4CAF50; /* Color de fondo del botón */
  color: white; /* Color del texto del botón */
  border-radius: 5px; /* Añade bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
}

.action-button:hover {
  background-color: #45a049; /* Color de fondo al pasar el mouse */
}

.crypto-table {
  width: 100%; /* O el ancho que prefieras */
  border-collapse: collapse;
  font-size: 40px; /* Aumenta el tamaño del texto */
}

.crypto-table th,
.crypto-table td {
  border: 1px solid #ddd; /* Bordes de las celdas */
  padding: 15px; /* Aumentar el padding para mayor espacio */
  text-align: left;
}

.crypto-table th {
  background-color: #f2f2f2; /* Color de fondo para el encabezado */
}

.input-number {
  width: 100px; /* Ancho del input */
  text-align: center; /* Centrar texto dentro del input */
  font-size: 40px; /* Tamaño de fuente para el input */
  padding: 10px; /* Aumenta el padding para mayor tamaño */
  border: 1px solid #ddd; /* Bordes similares a las celdas de la tabla */
}

.action-button {
  font-size: 40px; /* Tamaño de fuente del botón */
  padding: 10px 20px; /* Padding para hacer el botón más grande */
  border: none; /* Quita el borde del botón */
  background-color: #4CAF50; /* Color de fondo del botón */
  color: white; /* Color del texto del botón */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
}

.action-button:hover {
  background-color: #45a049; /* Color de fondo al pasar el mouse */
}

table {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}
  table {
    width: 80%;
    margin: 20px auto;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }
  
  input {
    width: 100px;
    text-align: center;
  }
  </style>
  