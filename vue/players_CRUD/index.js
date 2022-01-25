"use strict";

const AddPlayerComponent = {
  name: "add-player",
  // TODO: Implement the <"add-player"> component here.
  
  data: function () {
    return {
      value:'',
      player: {
        name: '',
        isActive: false 
      },
      reqStatus: ''
    };
  },
 
   

  methods: {
    addPlayer(player){

    },

  },

  

  template: 
  `<form id="submit-player" >
    <input v-model="value" id="input-player" type="text" placeholder="Enter player name"/>
    <button id="add-btn" type="submit" @click="addPlayer">Add</button>
  </form>`


};


// Vue.component('button-counter', {
//   data: function () {
//     return {
//       count: 0
//     }
//   },
//   template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
// })




const ListPlayersComponent = {
  name: "list-players",
  // TODO: Implement the <list-players> component here.
  
};

const ListPlayerComponent = {
  name: "list-player",
  // TODO: Implement the <list-player> component here.
};

const ShowPlayerComponent = {
  name: "show-player",
  // TODO: Implement the <show-player> component here.
};

const RequestStatusComponent = {
  name: "request-status",
  // TODO: Implement the <request-status> component here.
};

const App = {
  template: `
    <div>
        <p>
          // TODO: Implement the App component here.
          
          <add-player></add-player>
        

        </p>
    </div>
  `,
};

 